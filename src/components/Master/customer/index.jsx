import React, { useEffect, useState } from "react";
import CustomerInformation from "./CustomerInformation";
import useFetch from "../../Hooks/useFetch";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactToast, { showToastError, showToastMessage } from "../../CustomComp/ReactToast";
import { Excel } from "antd-table-saveas-excel";

const Customer = () => {
  const api = useFetch();
  const { state } = useLocation();
  const history = useHistory();
  const [inputValue, setInputValue] = useState({
    custname: "",
    archname: "",
    email: "",
    mobile: "",
    reference: "",
    add1: "",
    add2: "",
    add3: "",
    add4: "",
    archmobile: "",
    gst: "",
  });
  const [loading, setLoading] = useState(false);
  const [masterGrpData, setMasterGrpData] = useState([]);
  const [businessNatureList, setBusinessNatureList] = useState([]);
  const [bnCodeList, setBnCodeList] = useState([]);
  const [masterGroupSelect, setMasterGroupSelect] = useState(null);
  const [masterGroupLabel, setMasterGroupLabel] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mobiledata, setMobileData] = useState([]);
  
 
  const handleSelectChange = (index , slObj) => {
 console.log('slObj342',slObj)
 let prevMobData = [...mobiledata];
 prevMobData[index] = slObj.mob;

 let prevSelectedOptions = [...selectedOptions, slObj];
 console.log(prevSelectedOptions)
 setMobileData(prevMobData);
 setSelectedOptions(prevSelectedOptions);
    setMobileData(prevMobData)
  
 
 
  };

  const selectHandler = (masterGroupSelect) => {
    setMasterGroupSelect(masterGroupSelect);
    setMasterGroupLabel(masterGroupSelect.label);

    //  console.log("label",masterGroupSelect.label)
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const {
    custname,
    archname,
    email,
    mobile,
    reference,
    gst,
    archmobile,
    add1,
    add2,
    add3,
    add4,
  } = inputValue;

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state && state.code) {
      var code = state.code;
    }

    const urlCustomer = "/api/SaveCustomerMaster1";
    console.log('selectedOptions', selectedOptions)
    let currData=[]
    selectedOptions.forEach((item)=>{
     console.log('item',item)
      currData.push({Code : code||0, BNCode:item.BNCode ,ArchName:item.label ,ArchCode:item.value,MobNo :item.mob,BNName :item.bname})
    },[])
    console.log('currData---',currData)
   
    var body = {
      CustomerMasterData: [
        {
          Code: code || 0,
          Name: custname,
          MobNo: mobile,
          Email: email,
          Ref: reference,
          ArchName: archname,
          Add1: add1,
          Add2: add2,
          Add3: add3,
          Add4: add4,
          ArchMobNo: archmobile,
          GSTNo: gst,
          MasterGrp: `${masterGroupLabel}`,
          UserName: custname,
        },
      ],
      CustContactList:[...currData],
    };
    console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        showToastMessage(got.msg);
        setInputValue({
          custname: "",
          archname: "",
          email: "",
          mobile: "",
          reference: "",
          add1: "",
          add2: "",
          add3: "",
          add4: "",
          archmobile: "",
          gst: "",
        });
        setLoading(false);
        if(code !== 0 && code != undefined){
          history.push('/list/2')
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

  // ======================masterGroup List===================
  const getMasterGrpHandler = async () => {
    var correctData = [];

    let Url = `/api/LoadMasterDetails1?code=0&MasterType=102`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        console.log("CustomerModify", listData);
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        //  console.log('modifyData', correctData)
        setMasterGrpData(correctData);
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
  // ======================Get businness nature list=====================
  
  // const getBusinessNatureHandler = async () => {
   

  //   let modifyUrl = `/api/LoadCustContactList?Code=0`;
  //   try {
  //     setLoading(true);
  //     let { res, got } = await api(modifyUrl, "GET", "");
  //     if (res.status == 200) {
  //       let listData = got.data;
        
  //       //  console.log('businessList', listData[0].bnCode)
  //        let bnCode =listData[0].bnCode
  //       //  setBnCode(bnCode)
  //       setBusinessNatureList(listData);
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       showToastError("Something Went Wrong in List loading");
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     showToastError(err);
  //   }
  // };
  // console.log(bnCode,'bnnnnnn')
  // React.useEffect(()=>{getBusinessNatureHandler()},[])
   // ======================Get businness nature list=====================
  //  const getBnCodeListHandler = async (index) => {
  //   console.log('running')
  //   let corrData=[]
  //   var code = businessNatureList[index]['bnCode']

  //   let modifyUrl = `/api/ArchMasterListAgainstBN?BNCode=${code}`;
   
  //   try {
  //     setLoading(true);
  //     let { res, got } = await api(modifyUrl, "GET", "");
  //     if (res.status == 200) {
  //       let listData = got.data;
        
  //       //  console.log('BnCode', listData)
  //       // setBusinessNatureList(listData);
  //       listData.map((item)=>{
  //         // console.log(item)
  //         corrData.push({value:item.code,label:item.name,BNCode:item.bn,mob:item.ofcMobNo,bname:item.bnName})
  //       })
  //       setBnCodeList(corrData);
   
  //       // console.log('list from BnList',corrData)
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       showToastError("Something Went Wrong in List loading");
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     showToastError(err);
  //   }
  // };


  const getModifyHandler = async () => {
    var code = state.code;
   
    // setLoader(true);
    let modifyUrl = `/api/LoadCustomerMasterDetails?Code=${code}&MobNo=""`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        let custMaster = listData.customerMasterData[0]
        let CustContact = listData.custContactList
        let custDataset=[]
        console.log("ModifyData",custMaster)
        console.log("ContactMasterData",CustContact)
        // setModifiedValue(listData);
        setInputValue({
          custname: custMaster.name,
          mobile: custMaster.mobNo,
          email: custMaster.email,
          reference: custMaster.ref,
          add1: custMaster.add1,
          add2: custMaster.add2,
          add3: custMaster.add3,
          add4: custMaster.add4,
          archname: custMaster.archName,
          custname: custMaster.name,
          archmobile: custMaster.archMobNo,
          gst: custMaster.gstNo,
        });
        setMasterGroupSelect({ label: custMaster.masterGrp });
        setMasterGroupLabel(custMaster.masterGrp);
        CustContact.map((item)=>{
          // console.log('iiiiiiiiii',item)
          custDataset.push({Code : item.code, BNCode:item.bnCode ,label:item.archName 
            ,value:item.archCode,MobNo :item.mobNo,BNName :item.bnName})
        })
        console.log('kjsgkteir', custDataset);
        setSelectedOptions([...custDataset])
        console.log('custDataset',custDataset)
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

  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(tableDataList, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };


  useEffect(() => {
    getMasterGrpHandler();
    if (state && state.code) {
      getModifyHandler();
    }
  }, [state]);

  // console.log(selectedOptions,'uuuuuu')

  return (
    <>
    <ReactToast/>
      <CustomerInformation
        handleInputField={handleInputField}
        saveHandler={saveHandler}
        loading={loading}
        inputValue={inputValue}
        masterGrpData={masterGrpData}
        selectHandler={selectHandler}
        masterGroupSelect={masterGroupSelect}
        // getBusinessNatureHandler={getBusinessNatureHandler}
        // businessNatureList={businessNatureList}
        handleSelectChange={handleSelectChange}
        selectedOptions={selectedOptions}
        // getBnCodeListHandler={getBnCodeListHandler}
        // bnCodeList={bnCodeList}
        mobiledata={mobiledata}
    
      />
    </>
  );
};
export default Customer;