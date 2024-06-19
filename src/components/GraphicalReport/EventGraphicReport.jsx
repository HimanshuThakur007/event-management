import React from "react";
import useFetch from "../Hooks/useFetch";
import { convertDate, convertDate2 } from "../CustomComp/DateTimeInput";
import EventGraphicPage from "./EventGraphicPage";

const EventGraphicReport = () => {
  let api = useFetch()
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId
  }
  const [dates, setDates] = React.useState({
    date1: new Date(),
    date2: new Date()
  });
  const [selectedValues, setSelectedValues] = React.useState({
    select2: null,
    
  });
  const [eventList, setEventList] = React.useState([]);
  const [eventCode,setEventCode]= React.useState(0)
  const [loading, setLoading] = React.useState(false);
  const[feedBackGraph,setFeedBackGraph]=React.useState([])
   // -----multiple-Select-----------------------
   const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
 
    // console.log(`Selected value for ${selectName}:`, selectedOption);
    if(selectName === "select2"){
      setEventCode(selectedOption.value)
    }
    

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
 const handleDateChange = (dateFieldName, dateValue) => {
  setDates({
    ...dates,
    [dateFieldName]: dateValue,
  });
  
};


 // ===================site-Graphical========================
 const getSiteWiseHappyGraficReport = async () => {
  
  let eventUrl = `/api/EventGraficReport?Code=${eventCode}&FDate=${sdate}&TDate=${edate}`;

  console.log('evturl',eventUrl)
  try {
    setLoading(true);
    let { res, got } = await api(eventUrl, "GET", "");
    if (res.status == 200) {
      let list = got;
      console.log('listdata', list.length >0?"hhh":"ttt")
      
      if(list.length > 0){
        // console.log('Hello great')
        setFeedBackGraph(list)
      }else{
        // console.log('hello less')
        alert("No Record Found!!") 
      } 
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
console.log('fffff',feedBackGraph)


  
//   // ================templateList============================
//   const getTemplateList = async () => {
//     let currData =[]
//     let addobj = {label:"All", value:0}
//     currData[0]=addobj
//     let eventUrl = `/api/LoadTemplateDetails?Code=0`;
//     try {
//       setLoading(true);
//       let { res, got } = await api(eventUrl, "GET", "");
//       if (res.status == 200) {
//         let list = got.data;
       
//         // console.log("llllist3", list);
//         list.forEach((item)=>{
//           currData.push({value:item.code,label:item.name})
//         })
//         setTemplateList(currData);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert("Something Went Wrong in List loading");
//       }
//     } catch (err) {
//       setLoading(false);
//       alert(err);
//     }
//   };

// ===================Event-List========================
const getEventList = async () => {
    let currData = [];
    let addobj = { label: "All", value: 0 };
    currData[0] = addobj;
    let eventUrl = `/api/LoadEventDetails?Code=0&WI=0&Ucode=${userId}`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        // console.log("llllist3", list);
        list.forEach((item) => {
          currData.push({ value: item.code, label: item.name });
        });
        setEventList(currData);
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

  let sdate = convertDate(dates.date1);
  let edate = convertDate(dates.date2);
  let showd1 = convertDate2(dates.date1)
  let showd2 = convertDate2(dates.date2)
  

  React.useEffect(()=>{
    getEventList();
  },[])

  // const generatePDF = () => {

  //   const report = new JsPDF('portrait','pt','a4');
  //   report.html(document.querySelector('#report')).then(() => {
  //       report.save('report.pdf');
  //   });
  // }

  return (
    <>
    <EventGraphicPage
    // generatePDF={generatePDF}
    sdate={showd1}
    edate={showd2}
    handleSelectChange={handleSelectChange}
    handleDateChange={handleDateChange}
    dates={dates}
    setSelectedValues={setSelectedValues}
    selectedValues={selectedValues}
    loading={loading}
    eventList={eventList}
    getSiteWiseHappyGraficReport={getSiteWiseHappyGraficReport}
    feedBackGraph={feedBackGraph}
    />
    </>
    
  );
};

export default EventGraphicReport;
