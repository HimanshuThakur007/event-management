/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import useFetch from '../Hooks/useFetch';

export const Emailconfig = () => {
    let api = useFetch();
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
        alert(got.msg);
        setInputValue(InitialData);
        // loadEmailHandler();
        
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
