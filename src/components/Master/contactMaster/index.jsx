import React from "react";
import ContactMasterPage from "./contactMasterPage";
// import { convertDate } from "../../CommonFile/DateTimeInput";
import { convertDate } from "../../CustomComp/DateTimeInput";
import useFetch from "../../Hooks/useFetch";
import ReactToast,{ showToastError, showToastMessage } from "../../CustomComp/ReactToast";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
// import ReactToast from "../../CustomComp/ReactToast";


const business_type_list = [
  {
    value: 1,
    label: "Premium",
  },
  {
    value: 2,
    label: "Normal",
  },
  {
    value: 3,
    label: "Special",
  },
  {
    value: 4,
    label: "Vip",
  },
  {
    value: 5,
    label: "Vvip",
  },
];

const ContactMasterComp = () => {
  let api = useFetch();
  const history = useHistory();
  const { state } = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [selectType, setSelectType] = React.useState(null);
  const [location, setlocation] = React.useState(null);
  const [selectTypeCode, setSelectTypeCode] = React.useState(0);
  const [locationCode, setlocationCode] = React.useState(0);
  const [selectBusinessNature, setselectBusinessNature] = React.useState(null);
  const [selectBusinessNatureCode, setSelectBusinessNatureCode] =
    React.useState(0);
  const [businessList, setBusinessList] = React.useState([]);
  const [locationList, setlocationList] = React.useState([]);
  const [dates, setDates] = React.useState({
    dob: new Date(),
    doa: new Date(),
    // Add more date fields as needed
  });
  const [inputValue, setInputValue] = React.useState({
    name: "",
    mobile: "",
    mobile2: "",
    email: "",
    org: "",
    rAdd: "",
    oAdd: "",
    pincode: "",
    location: "",
  });
  // console.log('datesss', dates.dob)

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // if(inputValue.mobile > 10 && inputValue.mobile2 > 10){
    //   console.log('inputMobile',)
    // if (inputValue.mobile){
    // let limit=10
    //     setInputValue({
    //       mobile: e.target.value.slice(0, limit)
    //     })
    //   }
      
    // }
  };
  // console.log(inputValue.mobile)

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  const typeSelectHandler = (select) => {
    setSelectType(select);
    setSelectTypeCode(select.value);
  };
  const businessNatureHandler = (select) => {
    setselectBusinessNature(select);
    setSelectBusinessNatureCode(select.value);
  };
  const locationHandler = (select) => {
    setlocation(select);
    setlocationCode(select.value);
  };
  const { name, mobile, mobile2, email, org, rAdd, oAdd, pincode } =
    inputValue;
  var DOB = convertDate(dates.dob);
  var DOA = convertDate(dates.doa);
  // -------------BusinessNatueDropDown------------------
  const getBusinessNatureList = async () => {
    var correctData = [];
    // setLoader(true);
    let modifyUrl = `/api/LoadMasterData?MasterType=7`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        // console.log("datass", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        // console.log("modifyData", correctData);
        setBusinessList(correctData);
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
  // ==========locationApi======================
  // let Url = `/api/LoadMasterData?MasterType=15`;
  const getLocationList = async () => {
    var locationData = [];
    // setLoader(true);
    let Url = `/api/LoadMasterData?MasterType=15`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("datass", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          locationData.push({ value: item.code, label: item.name });
        });
        // console.log("modifyData", correctData);
        setlocationList(locationData);
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
    // getBusinessNatureList();
    // getLocationList();
  }, []);
  // ---------savingApi-------------------------
  const saveHandler = async (e) => {
    e.preventDefault();
    if (state && state.code) {
      var code = state.code;
    }
    const urlBusinesspurpose = "/api/ArchMasterSave?MasterType=8";
    // console.log('codeUsers', code)
    var body = {
      Code: code || 0,
      Name: name,
      UserName: name,
      PerMobNo: mobile,
      OfcMobNo: mobile2,
      Email: email,
      Type: selectTypeCode,
      OrgName: org,
      ResAdd: rAdd,
      OfcAdd: oAdd,
      PinCode: pincode,
      Location: locationCode,
      DOB: dates.dob,
      DOA: dates.doa,
      BN: selectBusinessNatureCode,
    };
    // console.log("body", body);
    try {
      // console.log("url", urlBusinesspurpose);
      // console.log("body", body);
      setLoading(true);
      let { res, got } = await api(urlBusinesspurpose, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        showToastMessage(got.msg);
        setLoading(false);
        setInputValue({
          name: "",
          mobile: "",
          mobile2: "",
          email: "",
          org: "",
          rAdd: "",
          oAdd: "",
          pincode: "",
          location: "",
        });
        setSelectType(null);
        setselectBusinessNature(null);
        setDates({
          dob: new Date(),
          doa: new Date(),
        });
// console.log(code,'at modify Time arch')
        if(code !== 0 && code != undefined){
          
          history.push('/list/5')
          //  console.log('hello from contractor')
        }
      } else {
        setLoading(false);
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };

  // ---------------Date-convert------------------------
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

  // console.log("convertDate##", convertToIST("21/08/2023"));

  // --------------------modify-----------------

  const getModifyHandler = async () => {
    var code = state.code;

    // setLoader(true);
    let modifyUrl = `/api/ArchMasterDetails?Code=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        // console.log('listData', listData)
        let d = convertToIST(listData.dob);
        let f = convertToIST(listData.doa);

        let type = `${
          listData.type == 1
            ? "Premium"
            : listData.type == 2
            ? "Normal"
            : listData.type == 3
            ? "Special"
            : listData.type == 4
            ? "Vip"
            : listData.type == 5
            ? "Vvip"
            : null
        }`;
        // console.log('dddd',type)
        setInputValue({
          name: listData.name,
          mobile: listData.perMobNo,
          mobile2: listData.ofcMobNo,
          email: listData.email,
          org: listData.orgName,
          rAdd: listData.resAdd,
          oAdd: listData.ofcAdd,
          pincode: listData.pinCode,
          // location: listData.location,
        });
        setselectBusinessNature({ label: listData.bnName });
        setSelectBusinessNatureCode(listData.bn);
        setSelectType({ label: type });
        setSelectTypeCode(listData.type);
        setlocation({label: listData.locationName})
        setlocationCode(listData.location)

        setDates({
          dob: new Date(d),
          doa: new Date(f),
        });
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

  React.useEffect(() => {
    if (state && state.code) {
      getModifyHandler();
    }
  }, [state]);
  return (
    <>
      <ReactToast />
      <ContactMasterPage
        loading={loading}
        handleDateChange={handleDateChange}
        dates={dates}
        handleInputField={handleInputField}
        inputValue={inputValue}
        saveHandler={saveHandler}
        typeList={business_type_list}
        selectType={selectType}
        typeSelectHandler={typeSelectHandler}
        // businessList={businessList}
        // selectBusinessNature={selectBusinessNature}
        // businessNatureHandler={businessNatureHandler}
        location={location}
        // setlocation={setlocation}
        locationHandler={locationHandler}
        // locationList={locationList}
      />
    </>
  );
};

export default ContactMasterComp;
