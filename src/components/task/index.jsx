import React, { useState } from "react";
import TaskPage from "./taskPage";
import useFetch from "../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../CustomComp/ReactToast";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { convertDate } from "../CustomComp/DateTimeInput";
var code;
const Task = () => {
  let api = useFetch();

  // const { state } = useLocation();
  // const history = useHistory()

  const [assignToList, setAssignToList] = useState([]);
  const [inputValue, setInputValue] = useState({
    Name: "",
    Tmptime: "",
    Mobile: "",
    Email: "",
    Desc: "",
    UserName: "",
    ExpTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [multiQueValue, setMultiQueValue] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [purposeList, setPurposeList] = useState([]);
  const [dates, setDates] = useState({
    date1: new Date(),
    date2: new Date(),
  });
  const [purposeCode, setPurposeCode] = useState(0);
  const [priorityCode, setPriorityCode] = useState(0);
  const [statusCode, setStatusCode] = useState(0);
  const [siteCode, setSiteCode] = useState(0);
  const [customerCode, setCustomerCode] = useState(0);
  const [customerList, setCustomerList] = useState([]);
  const [multiSitetValue, setMultiSitetValue] = useState([]);
  const [multiSiteParamValue, setMultiSiteParamValue] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    select1: null,
    select2: null,
    select3: null,
    select4: null,
    select5: null,
  });
  const [base64Image, setBase64Image] = useState("");

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
  // console.log('base64Image',base64Image)

  // --------------multiselect select-list------------------
  const handleMultiSelectChange = (selectOptions) => {
    // console.log(selectOptions);
    setMultiSelectValue(selectOptions);
  };

// ===================multi-site-Handler================================
const handleMultiSiteChange = (selectOptions) => {
  // console.log(selectOptions);
  let arr = []

  setMultiSitetValue(selectOptions);
  
  console.log(selectOptions)
  selectOptions.map((items)=>{
    arr.push(items.value.toString())
  })
  var kk;
  if(arr.length > 0){
    kk = arr.join(',')
  }

  getuserCreationList(kk)
};
// console.log('multiselectVal', multiSitetValue)

  // --------------multiselect Que select-list------------------
  const handleMultiQuestionChange = (selectOptions) => {
    // console.log(selectOptions);
    setMultiQueValue(selectOptions);
  };

  // -----------------------dateField Handler--------------------------------------------
  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };
  // -----multiple-Select-----------------------
  
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedValues
  ) => {
    // console.log(`Selected value for ${selectName}:`, selectedOption);
    // console.log('ccccccccc',selectedOption)

    {
      selectName == "select1"
        ? setPurposeCode(selectedOption.value)
        : selectName == "select2"
        ? setPriorityCode(selectedOption.value)
        : selectName == "select3"
        ? setStatusCode(selectedOption.value)
        : selectName == "select4"
        ? setSiteCode(selectedOption.value)
        : selectName == "select5"
        ? setCustomerCode(selectedOption.value)
        : null;
    }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  const { Name, Tmptime, Mobile, Email, Desc, UserName, ExpTime } = inputValue;

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // -------------------customerList------------------
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
  const getuserCreationList = async (val) => {
   
    // console.log('value on basis of site', value)
    let corrData = [];
    let Url = `/api/LoadUserMasterList1?Site=${val}&ProjType=2`;
    console.log(Url)
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("dataUserCreation", got.data);
        let list = got.data;
        list.forEach((element) => {
          corrData.push({ value: element.code, label: element.name });
        });

        setAssignToList(corrData);

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

  // -------------------------Site-------------------------

  const getSiteList = async () => {
    let corrData = [];
    let Url = `/api/LoadMasterDetails1?code=0&MasterType=100`;
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

  // -----------------Review Que List---------------
  const getReviewList = async () => {
    let corrData = [];
    let Url = `/api/LoadMasterDetails1?code=0&MasterType=101`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("depdata", got.data);
        let list = got.data;

        list.map((item, index) => {
          if (item.c1 == 2) {
            corrData.push({ value: item.code, label: item.name });
            setReviewData(corrData);
          }
        });
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

  const getPurposeList = async () => {
    let corrData = [];
    let Url = `/api/LoadMasterData?MasterType=6`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((item) => {
          corrData.push({ value: item.code, label: item.name });
        });
        setPurposeList(corrData);

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

  React.useEffect(() => {
    // getuserCreationList();
    getSiteList();
    getReviewList();
    getPurposeList();
    getList();
  }, []);

  const saveHandler = async (e) => {
    e.preventDefault();

    // console.log(code, "from saveHandler");

    const url = "/api/SaveTemplateMaster";
    // console.log('codeUsers', code)
    let queArr = [];
    let mainArr = [];
    let siteArr=[];
    let sdate = convertDate(dates.date1)
    let expdate = convertDate(dates.date2)
    if (multiSelectValue.length > 0) {
      multiSelectValue.map((item) => {
        mainArr.push({ UCode: item.value, Code: code || 0 });
      });
    }
    if (multiSitetValue.length > 0) {
      multiSitetValue.map((item) => {
        siteArr.push({ SCode : item.value, Code: code || 0 });
      });
    }

    if (multiQueValue.length > 0) {
      multiQueValue.map((item) => {
        queArr.push({ QCode: item.value, Code: code || 0 });
      });
    }

    var body = {
      TemplateMasterDetails: [
        {
          Code: code || 0,
          Name: Name,
          Tmptime: Tmptime,
          Mobile: Mobile,
          Email: Email,
          Desc: Desc,
          UserName: "",
          Purpose: purposeCode,
          Priority: priorityCode,
          Status: statusCode,
          Site: siteCode,
          StDate: sdate,
          Expdate: expdate,
          ExpTime: ExpTime,
          Customer: customerCode,
        },
      ],
      TemplateAssigntoList: [...mainArr],
      TemplateQuestionsList: [...queArr],
      TemplateImgs: [
        {
          Code: code || 0,
          Img: base64Image || "",
        },
      ],
      TemplateSitesList :[...siteArr]
    };
    // console.log("templatebody", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(url, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        showToastMessage(got.msg);
        $("#add_task").modal("hide")
        getTemplateList()
        setLoading(false);
        setInputValue({
          Name: "",
          Tmptime: "",
          Mobile: "",
          Email: "",
          Desc: "",
          UserName: "",
          ExpTime: "",
        });
        setMultiSelectValue([]);
        setMultiQueValue([]);
        setSelectedValues({
          select1: null,
          select2: null,
          select3: null,
          select4: null,
          select5: null,
        });
        // console.log('code', code)
        // if(code !== 0 && code != undefined){
        //   history.push('/list/6')
        // }
      } else {
        setLoading(false);
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
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
  // --------------------modify-----------------
  const clearHandler = () => {
    setInputValue({
      Name: "",
      Tmptime: "",
      Mobile: "",
      Email: "",
      Desc: "",
      UserName: "",
      ExpTime: "",
    });
    setMultiSelectValue([]);
    setMultiQueValue([]);
    setSelectedValues({
      select1: null,
      select2: null,
      select3: null,
      select4: null,
      select5: null,
    });
    setBase64Image("");
  };

  const getModifyHandler = async (code) => {
    setInputValue({
      Name: "",
      Tmptime: "",
      Mobile: "",
      Email: "",
      Desc: "",
      UserName: "",
      ExpTime: "",
    });
    setMultiSelectValue([]);
    setMultiQueValue([]);
    setSelectedValues({
      select1: null,
      select2: null,
      select3: null,
      select4: null,
      select5: null,
    });
    // var code = state.code;
    let quearr = [];
    let Assign = [];
    let site =[]

    // setLoader(true);
    let modifyUrl = `/api/LoadTemplateDetails?Code=${code}`;
    // console.log("urlllllll", modifyUrl);
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        let templateMaster = listData.templateMasterDetails[0];
        let siteArr = listData.templateSitesList
       
        let Questions = listData.templateQuestionsList;
        let AssignData = listData.templateAssigntoList;
        let d = convertToIST(templateMaster.stDate);
        let date = convertToIST(templateMaster.expdate);
        var temparr;
        var tempimg;
        // console.log(
        //   "datalistHHHHIMMMMM",
        //   typeof listData.templateImgs,
        //   listData.templateImgs.length
        // );
        if (listData.templateImgs.length !== 0) {
          temparr = listData.templateImgs[0];
          tempimg = temparr.img;
        } else {
          // console.log("EEEELLLSSE");
          tempimg = "";
        }

        Questions.map((item) => {
          quearr.push({
            code: item.code,
            value: item.qCode,
            label: item.question,
          });
        });
        AssignData.map((item) => {
          Assign.push({
            code: item.code,
            value: item.uCode,
            label: item.userName,
          });
        });
        siteArr.map((item)=>{
          site.push({
            code:item.code,
            value:item.sCode,
            label:item.site
          })
        })

        setInputValue({
          Name: templateMaster.name,
          Tmptime: templateMaster.tmptime,
          Mobile: templateMaster.mobile,
          ExpTime: templateMaster.expTime,
          Email: templateMaster.email,
          Desc: templateMaster.desc,
        });
        setSelectedValues({
          select1: {
            label: templateMaster.purposeNme,
            value: templateMaster.purpose,
          },
          select2: { label: templateMaster.priorityName },
          select3: { label: templateMaster.statusName },
          select4: { label: templateMaster.siteName },
          select5: { label: templateMaster.customerName },
        });
        setDates({
          date1: new Date(d),
          date2: new Date(date),
        });
        console.log("siteArr", siteArr);
        setMultiSelectValue([...Assign]);
        setMultiSitetValue([...site]);
        setMultiQueValue([...quearr]);
        setPriorityCode(templateMaster.priority);
        setStatusCode(templateMaster.status);
        setBase64Image(tempimg);
        setPurposeCode(templateMaster.purpose);
        setSiteCode(templateMaster.site);
        setCustomerCode(templateMaster.customer);
        setLoading(false);
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
    }
  };
  const [templateList, setTemplateList] = React.useState([]);

  const onRowClick = (record) => {
    $("#add_task").modal("show");
    code = record.code;
    // console.log(code);
    getModifyHandler(code);
    // history.push({
    //   pathname: "/tasks",
    //   state: { code: record.code },
    // });
  };

  const getTemplateList = async () => {
    let eventUrl = `/api/LoadTemplateDetails?Code=0`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setTemplateList(list);
        // console.log("llllist43", list);
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

  React.useEffect(() => {
    getTemplateList();
  }, []);

  return (
    <>
      <ReactToast />
      <TaskPage
        inputValue={inputValue}
        dates={dates}
        setSelectedValues={setSelectedValues}
        selectedValues={selectedValues}
        handleSelectChange={handleSelectChange}
        handleInputField={handleInputField}
        handleDateChange={handleDateChange}
        handleMultiSelectChange={handleMultiSelectChange}
        multiSelectValue={multiSelectValue}
        assignToList={assignToList}
        loading={loading}
        saveHandler={saveHandler}
        siteList={siteList}
        purposeList={purposeList}
        handleMultiQuestionChange={handleMultiQuestionChange}
        setMultiQueValue={setMultiQueValue}
        multiQueValue={multiQueValue}
        reviewData={reviewData}
        handleImageUpload={handleImageUpload}
        customerList={customerList}
        templateList={templateList}
        onRowClick={onRowClick}
        base64Image={base64Image}
        clearHandler={clearHandler}
        multiSitetValue={multiSitetValue}
        handleMultiSiteChange={handleMultiSiteChange}
      />
    </>
  );
};
export default Task;
