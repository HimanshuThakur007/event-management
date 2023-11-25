import React,{useEffect, useState} from 'react'
import SiteCreationPage from './SiteCreationPage';
import ReactToast,{ showToastError, showToastMessage } from '../../CustomComp/ReactToast';
import useFetch from '../../Hooks/useFetch';
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SiteCreationComp = () => {
  const api = useFetch()
  const { state } = useLocation();
  const history = useHistory()
  const [inputValue, setInputValue] = useState({
    name:'',
    s1:'',s2:'',s3:'',s4:"",s5:''
  });
  const [loading, setLoading] = useState(false)

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { name, s1,s2,s3,s4} = inputValue;
  // ------------------master-type 100 for site creation-----------------

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state && state.code) {
      var code = state.code;}
      const url = "/api/SaveMasterData1";
    // console.log('codeUsers', code)
    var body = {
      Code: code||0,
      Name: name,
      MasterType :100,
      s1,s2,s3,s4
     
    };
    console.log("url", body);
    try {
      setLoading(true)
      let { res, got } = await api(url, "POST", body);
      if (res.status == 200) {
        console.log("maindata", body);
        showToastMessage(got.msg);
        setLoading(false)
        setInputValue({
          name:'',
          s1:'',s2:'',s3:"",s4:''
        })
        // if(code !== 0 && code != undefined){
        //   history.push('/list/3')
        // }
      } else {
        setLoading(false)
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false)
      showToastError(error);
    }
  }

  // --------------------modify--------------------

  const getModifyHandler = async () => {
    var code = state.code;

    // setLoader(true);
    let modifyUrl = `/api/LoadMasterDetails1?Code=${code}&MasterType=100`;
    try {
      setLoading(true)
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        console.log("data", listData);
        setInputValue({
          name:listData.name,
          s2:listData.s2,
          s1:listData.s1,
          // compcode:listData.compCode,
          s3:listData.s3,
          s4:listData.s4
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

  useEffect(() => {
    if (state && state.code) {
      getModifyHandler();
    }
  }, [state]);



  return (
   <>
      <ReactToast/>
   <SiteCreationPage
    handleInputField={handleInputField} 
    saveHandler={saveHandler} 
    inputValue={inputValue} 
    loading={loading}
   /> 
   </>
  )
}

export default SiteCreationComp;