import React,{useState,useEffect} from 'react'
import ComparisonGraph from './ComparisonGraph'
import { convertDate, convertDate2 } from '../CustomComp/DateTimeInput';
import useFetch from '../Hooks/useFetch';

const ComparisonPage = () => {
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
  const[comparisonGraph,setComparisonGraph]=React.useState([])
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId
  } 
   // -----multiple-Select-----------------------
   const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
 
    // console.log(`Selected value for ${selectName}:`, selectedOption);
    if(selectName === "select1"){
        setSiteName(selectedOption.label)
        const siteCode = selectedOption.map(item => item.value)
        // const result = '"' + siteCode.join(',') + '"';
        const result = siteCode.join(',') 
        // console.log("site---",result)
        setSiteCode(result)
    }else if (selectName === 'select2'){
        setTemplateCode(selectedOption.value)
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
 const ComparisonGraficReport = async () => {
  
    let eventUrl = `/api/MultiSiteComprisionReport?Code=${templateCode || 0}&Site=${siteCode}&FDate=${sdate}&TDate=${edate}`;
    console.log("url", eventUrl); // Check the URL being used for the API call
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      console.log("API response:", res);
      console.log("Data received:", got);
      if (res.status === 200) {
        if (got) {
   
        setComparisonGraph(got);
        } else {
          console.error("Data received from API is undefined");
        }
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching data:", err);
      alert(err);
    }
};
// console.log('fffff',feedBackGraph)


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
  let showd1 = convertDate2(dates.date1)||new Date()
  let showd2 = convertDate2(dates.date2)||new Date()
  

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
    <ComparisonGraph
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
   ComparisonGraficReport={ComparisonGraficReport}
   comparisonGraph={comparisonGraph}
    />
    </>
  )
}

export default ComparisonPage