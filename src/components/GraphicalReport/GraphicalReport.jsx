import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import GraphicalChart from "./GraphicalPieChart";
import GraphicalReportPage from "./GraphicalReportPage";
import useFetch from "../Hooks/useFetch";
import { convertDate, convertDate2 } from "../CustomComp/DateTimeInput";
import JsPDF from 'jspdf';
import { showToastError } from "../CustomComp/ReactToast";

const GraphicalReport = () => {
  let api = useFetch()
  const [dates, setDates] = React.useState({
    date1: new Date(),
    date2: new Date()
  });
  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    select2: null,
    
  });
  const [siteList, setSiteList] = React.useState([]);
  const [templateList, setTemplateList] = React.useState([]);
  const [questionReport, setQuestionReport] = React.useState([]);
  const [siteCode,setSiteCode]= React.useState(0)
  const [siteName,setSiteName]= React.useState("")
  const [templateCode,setTemplateCode]= React.useState(0)
  const [loading, setLoading] = React.useState(false);
  const[feedBackGraph,setFeedBackGraph]=React.useState([])

  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId
  } 
   // -----multiple-Select-----------------------
   const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
 
    // console.log(`Selected value for ${selectName}:`, selectedOption);
    if(selectName === "select1"){
      setSiteCode(selectedOption.value)
      setSiteName(selectedOption.label)
    }else if(selectName === 'select2'){
      setTemplateCode(selectedOption.value)
    }
//  {
//   selectName == "select1" ? (setSiteCode(selectedOption.value),
//   setSiteName(selectedOption.label)):
//   selectName == 'select2'?setTemplateCode(selectedOption.value):
//   null
//  }

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
  
  let eventUrl = `/api/SiteWiseHappyGraficReport?Site=${siteCode||0}&Code=${templateCode}&FDate=${sdate}&TDate=${edate}`;

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


  // -------------------------Site-------------------------

  const getSiteList = async () => {
    let corrData = [];
    let Url = `/api/LoadReportingSites?User=${userId}`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("depdata", got.data);
        let list = got.data;

        list.forEach((element) => {
          corrData.push({ value: element.code, label: element.name });
        });
        setSiteList(corrData);
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

  // ================templateList============================
  const getTemplateList = async () => {
    let currData =[]
    let addobj = {label:"All", value:0}
    currData[0]=addobj
    let eventUrl = `/api/LoadTemplateDetails?Code=0`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
       
        // console.log("llllist3", list);
        list.forEach((item)=>{
          currData.push({value:item.code,label:item.name})
        })
        setTemplateList(currData);
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
    getSiteList();
    getTemplateList();
  },[])

  // const generatePDF = () => {

  //   const report = new JsPDF('portrait','pt','a4');
  //   report.html(document.querySelector('#report')).then(() => {
  //       report.save('report.pdf');
  //   });
  // }

  return (
    <>
    <GraphicalReportPage
    // generatePDF={generatePDF}
    sdate={showd1}
    edate={showd2}
    siteName={siteName}
    handleSelectChange={handleSelectChange}
    handleDateChange={handleDateChange}
    dates={dates}
    setSelectedValues={setSelectedValues}
    selectedValues={selectedValues}
    loading={loading}
    siteList={siteList}
    templateList={templateList}
    getSiteWiseHappyGraficReport={getSiteWiseHappyGraficReport}
    feedBackGraph={feedBackGraph}
    />
    </>
    
  );
};

export default GraphicalReport;
