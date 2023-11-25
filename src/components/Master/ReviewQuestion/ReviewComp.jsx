import React from 'react'
import useFetch from '../../Hooks/useFetch';
// import ReactToast, { showToastError, showToastMessage } from '../../CustomComp/ReactToast';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactToast, { showToastError, showToastMessage } from '../../CustomComp/ReactToast';
import ReviewPage from './ReviewPage';


const ReviewQueComp = () => {
  var list = [{
    value:1, label:"Event"
},
{
    value:2, label:"Template"
}
]
    const [loading, setLoading] = React.useState(false);
    const [selectType, setSelectType] = React.useState(null)
    const [selectTypeCode, setSelectTypeCode] = React.useState(0)
  const api = useFetch();
const { state } = useLocation();
const history = useHistory()
const [inputValue, setInputValue] = React.useState({
  name:''
});
// console.log("ffff",state.code)
const selectHandler=(select)=>{
    setSelectType(select)
    setSelectTypeCode(select.value)
}

  const handleInputField = (e) => {
      const { name, value } = e.target;
      setInputValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const { name } = inputValue;

    // ----------------------masterType-101-ReviewQue------------------------

    const saveHandler = async(e) => {
      e.preventDefault();
      if (state && state.code) {
        var code = state.code;}
      const url = "/api/SaveMasterData1";
      // console.log('codeUsers', code)
      var body = {
        Code: code||0,
        Name: name,
        MasterType :101,
        c1:selectTypeCode
       
      };
      console.log('body', body)
      try {
          // console.log("url", urlpurpose);
          // console.log('body', body)
          setLoading(true)
          let { res, got } = await api(url, "POST", body);
          if (res.status == 200) {
            // console.log("maindata", body);
            showToastMessage(got.msg);
            setLoading(false);
            setInputValue({
              name:'',
            });
            setSelectTypeCode(0)
          setSelectType(null)
            console.log('code', code)
            if(code !== 0 && code != undefined){
              history.push('/list/10')
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
  
    // const getModifyHandler = async () => {
    //   var code = state.code;
    //     console.log('Code', code)
    //   // setLoader(true);
    //   let modifyUrl = `/api/LoadMasterDetails1?Code=${code}&MasterType=101`;
    //   console.log(modifyUrl,'mmmmmmmmm')
    //   try {
    //     setLoading(true)
    //     let { res, got } = await api(modifyUrl, "GET", "");
    //     if (res.status == 200) {
    //       console.log("ModifyData", got.data);
    //       let listData = got.data[0];
    //       console.log("Review",`${listData.c1 == 2?{label:"Template"}:null}`)
    //       console.log('%%',listData.name)
    //       setInputValue({
    //         name:listData.name,
           
    //       })
    //       setSelectTypeCode({value:listData.c1})
    //       setSelectType({label:`${listData.c1 == 2?"Template":listData.c1==1?"Event":''}`})
    //       setLoading(false)
    //     } else {
    //       setLoading(false)
    //       showToastError("Something Went Wrong in List loading");
    //     }
    //   } catch (err) {
    //     setLoading(false)
    //     showToastError(err);
    //   }
    // };
    const getModifyHandler = async () => {
      var code = state.code;
  
      // setLoader(true);
      let modifyUrl = `/api/LoadMasterDetails1?Code=${code}&MasterType=101`;
      try {
        setLoading(true)
        let { res, got } = await api(modifyUrl, "GET", "");
        if (res.status == 200) {
          // console.log("data", got.data);
          let listData = got.data[0];
          setInputValue({
            name:listData.name,
           
          })
          setSelectTypeCode(listData.c1)
          setSelectType({label:listData.c1Name})
          
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
    <ReviewPage
     inputValue={inputValue}
     handleInputField={handleInputField}
     saveHandler={saveHandler}
     loading={loading}
     selectHandler={selectHandler}
     selectType={selectType}
     list={list}
    />
    </>
  )
}

export default ReviewQueComp