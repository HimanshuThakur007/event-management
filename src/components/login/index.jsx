import React,{useState} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IMG01 from "../../assets/images/logo.png";
import { S_Logo,Jaiswallogo } from "../imagepath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactLoader from "../CustomComp/ReactLoader";
import useFetch from "../Hooks/useFetch";
import ReactToast, { showToastError, showToastMessage } from '../CustomComp/ReactToast';


const Login =(props)=> {
  const history = useHistory();
  var [captcha, setCaptcha] = useState("");
  var [cap_uri, setCapUri] = useState("");
  var [accessKey, setAccessKey] = useState("");

// let comp = props.comp
// console.log('comp',comp)
const[baseUrl,setBaseUrl]=useState('')
const[port, setPort] = useState('')
  const [inputValue, setInputValue] = useState({
    username:"",
    password:""
 })
 const [loading, setLoading] = useState(false)

//  ---------compCode Api----------------

React.useEffect(()=>{
var url = localStorage.getItem("Url","");
var port = localStorage.getItem("Port","");
if (url && port) {
setBaseUrl(url);
setPort(port);
}
},[])
// console.log("port&url",port +":" +baseUrl)

const handleInputField = (e) => {
  const { name, value } = e.target;
   
  setInputValue((prevState) => ({
    ...prevState,
    [name]: value,
  }));

};
const renderCaptcha = async () => {
  let url = "http://103.25.128.155:12017/api/GenerateCaptcha";
  let body = {
    key: "RfNygceey4M8GBRTnCSR2AZdnUh2",
  };

  try {
    await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((jsonStr) => jsonStr.json())
      .then((json) => {
   
       setCapUri(json.captchaBase64);
       setAccessKey(json.accesskey)
       
      });
  } catch (err) {
    alert(err);
  }
};
React.useEffect(()=>{
  renderCaptcha();
},[])
const saveCaptchaValue = (e) => {
 setCaptcha(e.target.value);
};
const   ValidateCaptcha = async (event) => {
  event.preventDefault();

  let url = `http://103.25.128.155:12017/api/ValidateCaptcha?key=RfNygceey4M8GBRTnCSR2AZdnUh2&accessKey=${accessKey}&input=${captcha}`;
  console.log("validate url", url);
  try {
    let response = await fetch(url);
    let json = response.json();
    json.then((res) => {
      if (res.status == 1) {
        handleSubmit();
      } else if (res.status == 0) {
      
        showToastError(res.message);
        return;
      } else {
      
        showToastError(res.message);
        renderCaptcha();
        return;
      }
    });
  } catch (err) {
    alert(err);
  }
};


const {username, password} = inputValue
// let api = useFetch()
// const checkInput = (e) => {
//   const onlyDigits = e.target.value.replace(/\D/g, "");
//   setNumber(onlyDigits);
// };
let user = username.slice(0,10)
     

const handleSubmit = (e)=>{
  // console.log('calling')
  e.preventDefault()

  const urlStr = `http://${baseUrl}:${port}/api/Authentication?UserName=${user}&Pwd=${password}&ProjType=2`;
  // console.log('url', urlStr)
  try {
    setLoading(true);
    const h = new Headers();
    h.append('Accept', 'application/json');
    h.append('CompCode', 'ESEVENTDB');
    h.append('FYear', '0');

    const myRequest = new Request(urlStr, {
        method: 'GET',
        headers: h,
        mode: 'cors',
        cache: 'default',
    });

    fetch(myRequest).then((response) => response.json())
   
    .then((json) => {
        const resultData = json
        // console.log('loginDataaaaa',resultData)
        const loginData = resultData
        console.log('loginResult',loginData)
        if(loginData.result == 1){
         
          let UserId= loginData.code;
          let TokenId= loginData.token
          let UserType=loginData.ut;
          let Admin= loginData.name;
          let Type = loginData.utName;
          let Email = loginData.email;
          let department = loginData.department
          let depName = loginData.departmentName
          let ProjType = loginData.ProjType
          // StoreData.push({UserId,UserType,Admin,TokenId,department,depName})
          sessionStorage.setItem("userData", JSON.stringify({UserId,UserType,Admin,TokenId,Type,Email,department,depName,ProjType}));
          setLoading(false);
      
    history.push('/')
  //  window.location.reload()

        }else{
          alert(loginData.msg)
        }
        setLoading(false)
        // setSerieslist(json.data)
    });
  } catch (err) {
    alert(err) 
    setLoading(false)
    //  setLoading(false)
    }


}



  return(
<>
  {/* Main Wrapper */}
  <ReactToast/>
    <Helmet>
        <title>Login - jaiswal Group</title>
        <meta name="description" content="Reactify Blank Page" />
    </Helmet>
    {loading ?<ReactLoader loaderClass="position-relative" loading={loading}  />: null}
  <div className="main-wrapper">
 
    <div className="account-content">
      <div className="container">
        {/* Account Logo */}
        <div className="account-logo">
          <Link to="/">
            <img src={Jaiswallogo} alt="Dreamguy's Technologies" />
          </Link>
        </div>
        {/* /Account Logo */}
        <div className="account-box">
          <div className="account-wrapper">
            <h3 className="account-title">Login</h3>
            <p className="account-subtitle">Access to our dashboard</p>
            {/* Account Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mobile No</label>
                <input name="username" value={user} className="form-control" autoComplete="off" type="number" min="0" onChange={handleInputField} required/>
                {user.length < 10 && (
        <p style={{ color: 'red' }}>Please enter a valid 10-digit mobile number.</p>
      )}
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Password</label>
                  </div>
                  {/* <div className="col-auto">
                    <Link className="text-muted" to="/forgot-password">
                      Forgot password?
                    </Link>
                  </div> */}
                </div>
                <input className="form-control" autoComplete="off" name="password" type="password" onChange={handleInputField} required/>
              </div>
              {/* <div className="form-group">
                <div className="row">
                  <img
                    onClick={renderCaptcha}
                    src="./assets/icons8-refresh-30.png"
                    alt="refresh"
                    style={{ cursor: "pointer", width:'15%' }}
                    className="ml-0"
                  />
      
                </div>
              
              </div> */}
              {/* <div className="form-group">
                <div className="row">
            
                  <img
                    src={cap_uri}
                    style={{ margin: "0 auto", width:'40%' }}
                    className="img-thumbnail captcha"
                  />
            
                </div>
              
              </div> */}
              {/* <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Password</label>
                  </div>
                  
                </div>
                <input
                  placeholder="Enter Captcha"
                  onChange={saveCaptchaValue}
                  className="form-control p-4 pr-1 pl-1"
                />
              </div> */}
              <div className="form-group text-center">
                {/* <Link to="/" className="btn btn-primary account-btn">
                  Login
                </Link> */}
                <button type='submit' className="btn btn-primary account-btn" >Login</button>
              </div>
              {/* <div className="account-footer">
                <p>
                  Don't have an account yet?{" "}
                  <Link to="/register">Register</Link>
                </p>
              </div> */}
            </form>
            {/* /Account Form */}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Main Wrapper */}
</>

)
};
export default Login;