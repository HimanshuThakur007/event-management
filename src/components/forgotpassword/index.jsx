import React from "react";
import { Link } from "react-router-dom";
// import IMG01 from "../../assets/images/logo.png";
import { Jaiswallogo } from "../imagepath";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";


const ForgotPassword =()=> {
    const location = useLocation();
    const history = useHistory();
    const mobNo = location.state?.mob
    console.log('mobno',mobNo)
    const [formData, setFormData] = React.useState({
        otp: '',
        password: '',
        confirmPassword:''
    });
    const [baseUrl, setBaseUrl] = React.useState("");
    const [port, setPort] = React.useState("");

    React.useEffect(() => {
        var url = localStorage.getItem("Url", "");
        var port = localStorage.getItem("Port", "");
        if (url && port) {
          setBaseUrl(url);
          setPort(port);
        }
      }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetPasswordHandler = async (e) => {
        e.preventDefault()
        // if (sessionData) {
                    let url = `http://${baseUrl}:${port}/api/ResetPassword?UserName=${mobNo}&Pwd=${formData.password}`;
                    console.log('passwordChange url', url);
                    try {
                        // setLoading(true);
                        const h = new Headers();
                        h.append("Accept", "application/json");
                        h.append("CompCode", "ESEVENTDB");
                        h.append("FYear", "0");
                    
                        const myRequest = new Request(url, {
                          method: "GET",
                          headers: h,
                          mode: "cors",
                          cache: "default",
                        });
                    
                        fetch(myRequest)
                          .then((response) => response.json())
                    
                          .then(async (json) => {
                            const resultData = json;
                            // console.log('loginDataaaaa',resultData)
                            const resetData = resultData;
                            console.log("loginResult", resetData);
                            if (resetData.status === 1) {
                                alert(resetData.msg)
                                history.push('/login')
                             
                            // setLoading(false)
                            } else {
                              alert(resetData.msg);
                            //   setLoading(false);
                            }
                          });
                      } catch (err) {
                        alert(err);
                        // setLoading(false);
                        //  setLoading(false)
                      }
                // }
    
      }

    console.log(location,'forgot-location')
    return (
        <div className="main-wrapper">
        <div className="account-content">
            
            <div className="container">
            
              
                <div className="account-logo">
                    <Link to="/">
                    <img src={Jaiswallogo} alt="Dreamguy's Technologies" />
                    </Link>
                </div>
              
                
                <div className="account-box">
                    <div className="account-wrapper">
                        <h3 className="account-title">ForgotPassword</h3>
                        <p className="account-subtitle">Access to our dashboard</p>
                        
                      
                        <form onSubmit={resetPasswordHandler}>
                            {/* <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" />
                            </div> */}
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" name="password" type="password" value={formData.password} onChange={handleChange}/>
                            </div>
                            {/* <div className="form-group">
                                <label>Repeat Password</label>
                                <input className="form-control" name="confirmPassword" type="password" value={formData.confirmPassword} />
                            </div> */}
                            <div className="form-group text-center">
                                <button className="btn btn-primary account-btn" type="submit">ForgotPassword</button>
                            </div>
                            <div className="account-footer">
                                <p>Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }

export default ForgotPassword;