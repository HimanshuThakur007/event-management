
import React,{useState} from "react";
// import { Helmet } from "react-helmet";
import ImagesUploder from '../image_uploder/index';
import { Link } from "react-router-dom";
import EventPage from "./EventPage";
import useFetch from "../Hooks/useFetch";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { convertDate } from "../CustomComp/DateTimeInput";

const Events = () => {
    let api = useFetch();
    const { state } = useLocation();
    const history = useHistory()
    const [evtTypeCode,setEvtTypeCode]= useState(0)
    const [evtStatusCode,setEvtStatusCode]= useState(0)
    const [assignToCode,setAssignToCode]= useState(0)
    const [siteToCode,setSiteToCode]= useState(0)
    const [inputValue, setInputValue] = useState({
        Name : "",
        EAdd : "",
        Det : "",
        ContName : "",
        Email :'',
        PhNo :'',
        ETime:''
      });
      const [dates, setDates] = useState({
        date1: new Date(),
      });
      console.log(dates.date1,'date')
      const [selectedValues, setSelectedValues] = useState({
        select1: null,
        select2: null,
        select3: null,
        select4: null
      });
      const [multiSelectValue, setMultiSelectValue] = useState([]);
      const [multiQueValue, setMultiQueValue] = useState([]);
      const [assignToList, setAssignToList] = useState([]);
      const [reviewData, setReviewData] = useState([]);
      const [siteList, setSiteList] = useState([]);
      const [eventStatusList, setEventStatusList] = useState([]);
      const [eventTypeList, setEventTypeList] = useState([]);
      const [loading, setLoading] = React.useState(false)
      const [eventImages, setEventImages] = React.useState([])
      const [customerList, setCustomerList] = React.useState([])
      const [customerCode, setCustomerCode] = React.useState(0)
      const [base64Image, setBase64Image] = useState('');
      



  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

      const handleDateChange = (dateFieldName, dateValue) => {
        setDates({
          ...dates,
          [dateFieldName]: dateValue,
        });
        
    };

    // --------------multiselect select-list------------------
    const handleMultiSelectChange = (selectOptions) => {
      // console.log(selectOptions);
      setMultiSelectValue(selectOptions);
    };
 
    // --------------multiselect Que select-list------------------
    const handleMultiQuestionChange = (selectOptions) => {
      // console.log(selectOptions);
      setMultiQueValue(selectOptions);
    };

    // -----------------Review Que List---------------
    const getReviewList = async () => {
      let corrData=[]
      let Url = `/api/LoadMasterDetails1?code=0&MasterType=101`;
      try {
        setLoading(true);
        let { res, got } = await api(Url, "GET", "");
        if (res.status == 200) {
          //  console.log('depdata',got.data)
          let list = got.data;

          list.map((item,index)=>{

              if(item.c1 == 1){
                  // console.log('himanshu 1')
                  corrData.push({value:item.code,label:item.name})
                  setReviewData(corrData);
              } 
          })
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
  
 

    // -----multiple-Select-----------------------
  const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
 
 {
  selectName == "select1" ? setEvtTypeCode(selectedOption.value): selectName == 'select2'?
  setEvtStatusCode(selectedOption.value): selectName == 'select3'?setSiteToCode(selectedOption.value):
  selectName == 'select4'?setCustomerCode(selectedOption.value):null
 }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
      const { Name, EAdd, ContName, Det, Email, PhNo,ETime } =  inputValue;
       
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      // ======================Customer-list================================

      const getList = async () => {
        let currData = [];
        let addobj = {label:"", value:0}
        currData[0]=addobj
        setLoading(true);
        let listUrl = `/api/LoadCustomerMasterList`;
        try {
          let { res, got } = await api(listUrl, "GET", "");
          if (res.status == 200) {
            // console.log('dataCustomer',got.data)
            let list = got.data;
            list.forEach((item) => {
              currData.push({ value: item.code, label: item.name, email:item.email,archMobNo:item.archMobNo });
            });
            // console.log(currData)
    
            setCustomerList(currData);
    
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

      // -----------userList load on assignTo handler--------------------
      const getuserCreationList = async () => {
        let corrData=[]
        let Url = `/api/LoadUserMasterList?ProjType=2`;
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            // console.log('dataUserCreation',got.data)
            let list = got.data;
            list.forEach(element => {
              corrData.push({value:element.code,label:element.name})
            });

            setAssignToList(corrData)
            
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

        // -------------------------Event-Type-------------------------

  const getEventTypeList = async () => {
    let currData=[]
    let Url = `/api/LoadMasterData?MasterType=18`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((item)=>{
          currData.push({value:item.code, label:item.name})
        })
        setEventTypeList(currData)
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


  // -------------------------Event-Status-------------------------

  const getEventStatusList = async () => {
    let currData=[]
    let Url = `/api/LoadMasterData?MasterType=19`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((item)=>{
          currData.push({value:item.code, label:item.name})
        })
        setEventStatusList(currData)
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
  // ----------------------siteto List------------------
  const getSiteList = async () => {
    let corrData=[]
    let Url = `/api/LoadMasterDetails1?code=0&MasterType=100`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
  
        list.forEach(element => {
          corrData.push({value:element.code,label:element.name})
        });
        setSiteList(corrData)
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

      React.useEffect(()=>{
        // getuserCreationList();
        getuserCreationList()
        getEventTypeList();
        getEventStatusList();
        getReviewList();
        getSiteList();
        getList()
      },[])
      // -----------------------------------------------------------------

      const saveHandler = async (e) => {
        let sdate = convertDate(dates.date1)
        e.preventDefault();
          if (state && state.code) {
            var code = state.code;}
          // const url = "/api/SaveTemplateMaster";
          // console.log('codeUsers', code)
          let queArr=[]
          let mainArr = [];
          if (multiSelectValue.length > 0){
          multiSelectValue.map((item) => {
            mainArr.push({ UCode: item.value , Code: code || 0 });
          })}

          if (multiQueValue.length > 0){
            multiQueValue.map((item) => {
              queArr.push({ QCode : item.value , Code: code || 0 });
          })}
        // console.log("main Arr", mainArr);
        const urlCreateUser = "/api/AddEvent";
        // console.log('codeUsers', selectedFiles)
        var body = {
          EsEventMasterDetails: [{
            Code: code|| 0,Name, EAdd:EAdd||"", Det, Customer:customerCode, Email, PhNo,ETime,
            EDate:sdate,EType :evtTypeCode, EStatus :evtStatusCode,Site:siteToCode
          },
        ],
        EventAssigntoList: [...mainArr],
        EventQuestionsList :[...queArr],
        EventImgs: [{
          Code : code|| 0,
          Img : base64Image
          }]
        };
        console.log("body", JSON.stringify(body));
        try {
          setLoading(true)
          let { res, got } = await api(urlCreateUser, "POST", body);
          if (res.status == 200) {
            // console.log("maindata", body);
            // alert(got.msg);        
            alert(got.msg)
            setInputValue({
                Name : "",
                EAdd : "",
                Det : "",
                Email :'',
                PhNo :'',
                ETime:''
            });
           
           
            setLoading(false)
          } else {
            setLoading(false)
            alert(got.msg);
           
          }
        } catch (error) {
          setLoading(false)
          alert(error);
        }
      };
      const convertToIST = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        const dateObject = new Date(year, month - 1, day); // Note: JavaScript months are 0-indexed
        const options = {
          timeZone: "Asia/Kolkata", // Indian Standard Time
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        return dateObject.toString("en-IN", options);
      };
      // =========================modify-list==============================
      const getModifyHandler = async () => {
        if (state) {
          if (state && state.code) {
            var code = state.code;
            // var path = state.path
          }
        }
        var assignArr = []
        let QueArr=[]
        let modifyUrl = `/api/LoadEventDetails?Code=${code}`;
        try {
          // setLoading(true)
          let { res, got } = await api(modifyUrl, "GET", "");
          if (res.status == 200) {
            console.log("Modifydata", got.data);
            var imageObj;
            var image; 
            let eventDetails = got.data[0].esEventMasterDetails[0];
            if(got.data[0].eventImgs.length!==0){
            imageObj = got.data[0].eventImgs[0]
            image = imageObj.img
            }
            let assignimage = got.data[0].eventAssigntoList;
            let Que = got.data[0].eventQuestionsList
            let date = convertToIST(eventDetails.eDate)
            setInputValue({
              Name:eventDetails.name,
              EAdd : eventDetails.eAdd,
              Det : eventDetails.det,
              ContName : eventDetails.contName,
              Email :eventDetails.email,
              PhNo :eventDetails.phNo,
              ETime:eventDetails.eTime
            })
            Que.map((item)=>{
              QueArr.push({code:item.code,value:item.qCode,label:item.question})
            })
            assignimage.map((item)=>{
                assignArr.push({code:item.code,label:item.userName,value:item.uCode})
            })
            setSelectedValues({
              select1:{label:eventDetails.eTypeName},
              select2:{label:eventDetails.eStatusName},
              select3:{label:eventDetails.siteName},
              select4:{label:eventDetails.customerName},

            })
            setDates({
              date1: new Date(date)
            })
            setEvtStatusCode(eventDetails.eStatus)
            setEvtTypeCode(eventDetails.eType)
            setSiteToCode(eventDetails.site)
            setMultiSelectValue([...assignArr])
            setMultiQueValue([...QueArr])
            setBase64Image(image)
            setCustomerCode(eventDetails.customer)
            // console.log('et456',eventDetails)
           
          } else {
            setLoading(false);
            // showToastError("Something Went Wrong in List loading");
            alert('someting went wrong')
          }
        } catch (err) {
          setLoading(false);
          // showToastError(err);
        }
      };

      React.useEffect(() => {
        if (state) {
          if (state && state.code) {
            getModifyHandler();
          }
        }
      }, [state]);

   

    return (
        <>
        <EventPage
        handleInputField={handleInputField}
        inputValue={inputValue}
        handleDateChange={handleDateChange}
        dates={dates}
        loading={loading}
        saveHandler={saveHandler}
        setSelectedValues={setSelectedValues}
        selectedValues={selectedValues}
        handleSelectChange={handleSelectChange}
        eventList={eventTypeList}
        siteList={siteList}
        EventStatus={eventStatusList}
        multiSelectValue={multiSelectValue}
        assignToList={assignToList}
        handleMultiSelectChange={handleMultiSelectChange}
        handleMultiQuestionChange={handleMultiQuestionChange}
        setMultiQueValue={setMultiQueValue}
        multiQueValue={multiQueValue}
        reviewData={reviewData}
        setEventImages={setEventImages}
        handleImageUpload={handleImageUpload}
        base64Image={base64Image}
        customerList = {customerList}
        />
        </>
    )
}

export default Events;