import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IMG01 from "../../assets/images/logo.png";
import { S_Logo, Jaiswallogo } from "../imagepath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactLoader from "../CustomComp/ReactLoader";
import useFetch from "../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../CustomComp/ReactToast";
import OtpForm from "../forgotpassword/OtpForm";

var navData = [];
const Login = (props) => {
  const history = useHistory();

  // let comp = props.comp
  // console.log('comp',comp)
  const [baseUrl, setBaseUrl] = useState("");
  const [port, setPort] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [emailAdd, setEmailAdd] = useState('');
  const [mobileAdd, setMobileAdd] = useState('');
  const [otp, setOtp] = useState('');
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [sideBarAddress, setSideBarAddress] = useState([]);

  //  ---------compCode Api----------------

  React.useEffect(() => {
    var url = localStorage.getItem("Url", "");
    var port = localStorage.getItem("Port", "");
    if (url && port) {
      setBaseUrl(url);
      setPort(port);
    }
  }, []);
  // console.log("port&url",port +":" +baseUrl)

  const handleInputField = (e) => {
    const { name, value } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const { username, password } = inputValue;
  let user = username.slice(0, 10);
  let api = useFetch();

  const handelOpenModal = () => {
    setIsModalOpen(true);
};

const handleVerifyOtp = (val) => {
  if(otp === val){   
      console.log("OTP Verified:", otp);
      setIsModalOpen(false);
      // router.push(`/forgot-password?email=${emailAdd}`)
      history.push({
        pathname: "/forgot-password",
        state: {mob: mobileAdd },
      });
  } else {
      console.log('not verified')
      setIsModalOpen(true)
  }
  // Your OTP verification logic here
};

const handleResendOtp = () => {
  console.log("Resend OTP");
  // forgotPasswordHandler()
  // Your resend OTP logic here
};

const forgotPasswordHandler = async (mobile) => {
  setIsModalOpen(true);
  console.log("Mobile No", mobile);
  // e.preventDefault();

  const urlStr = `http://${baseUrl}:${port}/api/ForgetPassword1?MobNo=${mobile}`;
  console.log('url', urlStr)
  try {
    setLoading(true);
    const h = new Headers();
    h.append("Accept", "application/json");
    h.append("CompCode", "ESEVENTDB");
    h.append("FYear", "0");

    const myRequest = new Request(urlStr, {
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
        const loginData = resultData;
        console.log("loginResult", loginData);
        if (loginData.status === 1) {
          let sentOtp = loginData.otp
          setOtp(sentOtp)
          alert(loginData.msg)
          // history.push({
          //             pathname: "/forgot-password",
          //             state: {mob: mobile },
          //           });
        setLoading(false)
        } else {
          alert(loginData.msg);
          setLoading(false);
        }
      });
  } catch (err) {
    alert(err);
    setLoading(false);
    //  setLoading(false)
  }

  // setLoading(true)
          // let url = `/api/ForgetPassword1?MobNo=${mobile}`;
          // try {
          //     const { res, got } = await api(url, 'GET');
          //     if (res.status == 200) {
          //         let sentOtp = got.otp
          //         setOtp(sentOtp)
          //         alert(got.msg)
          //         setIsModalOpen(true);
          //         history.push({
          //           pathname: "/forgot-password"
          //           // state: {mob: mobileAdd },
          //         });
          //         // router.push('/forgot-password')
          //         console.log('session-data', got);
          //         setLoading(false)
          //     } else {
          //         alert(got.msg);
          //         setLoading(false)
          //     }
          // } catch (error) {
          //     console.error('Failed to load cart data:', error);
          //     setLoading(false)
          // }
      

}

const handleCloseModal = () => {
  setIsModalOpen(false);
};

const handleSendOtp = (mobile) => {
  console.log("hanndel-otp-send", mobile)
  // setEmailAdd(email)
  setMobileAdd(mobile)
  forgotPasswordHandler(mobile);
};

  const getDynamicNavbarList = async (code) => {
    let Url = `/api/LoadUserMenuTree?UserCode=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log("sideNavData", JSON.stringify(got));
        navData = got;
        // getAllAddresses(navData)
        setSideBarAddress(navData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  function getAllAddresses(data) {
    const addresses = [];

    function traverse(node, parentAddress = "") {
      const currentAddress = parentAddress + node.address;
      addresses.push(currentAddress);

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          traverse(child, currentAddress);
        });
      }
    }

    data.forEach((item) => {
      traverse(item);
    });
    console.log(addresses, "aaadddtttt");
    return addresses;
  }

  const handleSubmit = (e) => {
    // console.log('calling')
    e.preventDefault();

    const urlStr = `http://${baseUrl}:${port}/api/Authentication?UserName=${user}&Pwd=${password}&ProjType=2`;
    console.log('url', urlStr)
    try {
      setLoading(true);
      const h = new Headers();
      h.append("Accept", "application/json");
      h.append("CompCode", "ESEVENTDB");
      h.append("FYear", "0");

      const myRequest = new Request(urlStr, {
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
          const loginData = resultData;
          console.log("loginResult", loginData);
          if (loginData.result == 1) {
            let UserId = loginData.code;
            let TokenId = loginData.token;
            let UserType = loginData.ut;
            let Admin = loginData.name;
            let Type = loginData.utName;
            let Email = loginData.email;
            let department = loginData.department;
            let depName = loginData.departmentName;
            let ProjType = loginData.ProjType;
            // StoreData.push({UserId,UserType,Admin,TokenId,department,depName})
            sessionStorage.setItem(
              "userData",
              JSON.stringify({
                UserId,
                UserType,
                Admin,
                TokenId,
                Type,
                Email,
                department,
                depName,
                ProjType,
              })
            );
            const userData = sessionStorage.getItem("userData");
            if (userData !== null) {
              var code = JSON.parse(userData).UserId;
            }
            await getDynamicNavbarList(code);
            console.log("sssaaadddd", sideBarAddress);
            setLoading(false);

            const addresses = getAllAddresses(navData); // Assuming `navData` contains the fetched dynamic navbar data
            const homeAddress = addresses.find((address) =>
              address.includes("/")
            );

            if (homeAddress) {
              history.push(homeAddress);
            } else if (addresses.length > 0) {
              // Push to the first address found
              history.push(addresses[0]);
            } else {
              console.log("No address found in navbar data");
            }
          } else {
            alert(loginData.msg);
            setLoading(false);
          }
        });
    } catch (err) {
      alert(err);
      setLoading(false);
      //  setLoading(false)
    }
  };
  return (
    <>
      {/* Main Wrapper */}
      <ReactToast />
      <Helmet>
        <title>Login - jaiswal Group</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {loading ? (
        <ReactLoader loaderClass="position-relative" loading={loading} />
      ) : null}
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
                    <input
                      name="username"
                      value={user}
                      className="form-control"
                      autoComplete="off"
                      type="number"
                      min="0"
                      onChange={handleInputField}
                      required
                    />
                    {user.length < 10 && (
                      <p style={{ color: "red" }}>
                        Please enter a valid 10-digit mobile number.
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                    </div>
                    <input
                      className="form-control"
                      value={password}
                      autoComplete="off"
                      name="password"
                      type="password"
                      onChange={handleInputField}
                      required
                    />
                  </div>
                  <div className="col-auto d-flex justify-content-end mb-3">
                        <a className="text-muted" onClick={handelOpenModal}>
                        {/* <a className="btn btn-secondary btn-lg disabled" role="button" aria-disabled="true"> */}
                          Forgot password?
                        </a>
                      </div>
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-primary account-btn"
                    >
                      Login
                    </button>
                  </div>
                </form>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /fotgot-model*/}
      {isModalOpen && (
                <OtpForm
                onClose={handleCloseModal}
                onVerify={handleVerifyOtp}
                onResend={handleResendOtp}
                onSendOtp={handleSendOtp}
                user = {user}
                />
            )}
    </>
  );
};
export default Login;
