import React from 'react';
import useFetch from '../../Hooks/useFetch';
import ReactToast, { showToastError, showToastMessage } from '../../CustomComp/ReactToast';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import EventPage from './EventPage';

const EventComp = () => {
    const [loading, setLoading] = React.useState(false)
    const api = useFetch();
  const { state } = useLocation();
  const history = useHistory()
  const [inputValue, setInputValue] = React.useState({
    name:'',
  });

    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const { name } = inputValue;

      const saveHandler = async(e) => {
        e.preventDefault();
        if (state && state.code) {
          var code = state.code;}
        const urlpurpose = "/api/SaveMasterData";
        // console.log('codeUsers', code)
        var body = {
          Code: code,
          Name: name,
          MasterType :18
         
        };
        // console.log('body', body)
        try {
            // console.log("url", urlpurpose);
            // console.log('body', body)
            setLoading(true)
            let { res, got } = await api(urlpurpose, "POST", body);
            if (res.status == 200) {
              // console.log("maindata", body);
              showToastMessage(got.msg);
              setLoading(false);
              setInputValue({
                name:'',
               
              });
              // console.log('code', code)
              if(code !== 0 && code != undefined){
                history.push('/list/6')
              }
            } else {
              setLoading(false)
              showToastError(got.msg);
            }
          } catch (error) {
            setLoading(false)
            showToastError(error);
          }
      }
    
      // --------------------modify-----------------
    
      const getModifyHandler = async () => {
        var code = state.code;
    
        // setLoader(true);
        let modifyUrl = `/api/LoadMasterDetails?Code=${code}`;
        try {
          setLoading(true)
          let { res, got } = await api(modifyUrl, "GET", "");
          if (res.status == 200) {
            // console.log("data", got.data);
            let listData = got.data[0];
            setInputValue({
              name:listData.name,
             
            })
            setLoading(false)
          } else {
            setLoading(false)
            showToastError("Something Went Wrong in List loading");
          }
        } catch (err) {
          setLoading(false)
          showToastError(err);
        }
      };
    
      React.useEffect(() => {
        if (state && state.code) {
          getModifyHandler();
        }
      }, [state]);
  return (
    <>
       <ReactToast/>
    <EventPage
    inputValue={inputValue}
    handleInputField={handleInputField}
    saveHandler={saveHandler}
    loading={loading}
    />
    </>
  )
}

export default EventComp;