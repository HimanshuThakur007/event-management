/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import useFetch from '../Hooks/useFetch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
var navData = [];
export const Emailconfig = () => {
    let api = useFetch();
    const [sideBarAddress, setSideBarAddress] = React.useState([]);
    const history = useHistory();
  let InitialData = {
    SenderID: "",
    PWD: "",
    SMTPServer: "",
    SMTPPort: "",
    EMailB: "",
  };
  const [values, setValues] = useState({});
  const [inputValue, setInputValue] = React.useState(InitialData);
  const [loading, setLoading] = useState(false)

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValueChange = (id, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };

  const { SenderID, PWD, SMTPServer, SMTPPort, EMailB } = inputValue;
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
  const handleEmailSave = async (e) => {
    e.preventDefault();
    const requestBody = {
      SenderID,
      PWD,
      SMTPServer,
      SMTPPort: parseInt(SMTPPort),
      EMailB,
      EMailS: "",
      EmailSSL: parseInt(values.ssl),
    };
    console.log("EmailJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveEMailConfig`;

    try {
      setLoading(true)
      const { res, got } = await api(saveurl, "POST", requestBody);
      if (got.status === 1) {
        // showToastMessage(got.msg);
        const userData = sessionStorage.getItem("userData");
        if (userData !== null) {
          var code = JSON.parse(userData).UserId;
        }
        await getDynamicNavbarList(code);
        const addresses = getAllAddresses(navData); 
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
        // alert(got.msg);
        setInputValue(InitialData);
        loadEmailHandler();
        
      } else {
        // showToastError(got.msg);
        alert(got.msg);
      }
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false)
    }
  };

  const loadEmailHandler = async () => {
    let url = `/api/GetEMailConfig`;
    console.log("modify", url);
    try {
      setLoading(true)
      const { res, got } = await api(url, "GET");
      // Handle response data
      if (res.status === 200) {
        let loadData = got.data[0];
        console.log("modDta:-email", loadData);
        setInputValue({
          SenderID: loadData.senderID,
          PWD: loadData.pwd,
          SMTPServer: loadData.smtpServer,
          SMTPPort: parseInt(loadData.smtpPort),
          EMailB: loadData.eMailB,
        });
        setValues({
          ssl: parseInt(loadData.emailSSL),
        });
        console.log( "loadData", loadData)
        setLoading(false)
      }
    } catch (error) {
      // Handle errors
      setLoading(false)
      console.error("Error:", error);
    }
  };
  // Example of making a GET request
  useEffect(() => {
    loadEmailHandler();
  }, []);
  return {handleInputField,handleEmailSave,handleValueChange,loading,inputValue,values}
}
