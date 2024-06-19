import React, { useEffect, useState,useRef } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../Hooks/useFetch";
import ReactToast, { showToastMessage,showToastError } from "../../CustomComp/ReactToast";
import UserPage from "./UserPage";




const block_list = [
  { label: "No", value: 0 },
  { label: "Yes", value: 1 },
];
const UserComp = () => {
  var code =0
  const { state } = useLocation();
  const history = useHistory();
  const api = useFetch();
  const [imagePath, setImagePath] = useState('')
  const [image, setImage] = React.useState('');
  const [visibility, setVisibility]= useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [blockOption, setBlockOption] = useState(null);
  const [typeVal, setTypeVal] = useState(null);
  const [typelist, setTypeList] = useState([]);
  const [blockVal, setBlockVal] = useState(null);
  const [modifySelect, setModifySelect] = useState();
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(null);
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
    address:'',
    whtsap:''
  });
  // console.log('useImagePath', imagePath)
  const [dates, setDates] = useState({
    dob: new Date(),
    
    // Add more date fields as needed
  });
  const [userRightList, setUserRightList] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [multiSiteList, setMultisiteList] = useState([]);
  const [siteSelect, setSiteSelect] = useState(null);
  const [selectSiteCode, setSelectSiteCode] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  if (state) {
    if (state && state.code) {
      code = state.code;
    }
  }

  console.log('code', code)
  // --------------------------date handler-----------------------------------------
  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
    
};

const multiSiteHandler = (selectOptions)=>{
  setMultisiteList(selectOptions)
  console.log('options', selectOptions)
}

  // const toastmsg = showToastMessage()

  const selectHandler = (selectedOption) => {
    setSelectedOption(selectedOption);

    setTypeVal(selectedOption.value);
    setModifySelect(selectedOption.label);
  };
  const selectSiteHandler = (siteSelect)=>{
        setSiteSelect(siteSelect)
        setSelectSiteCode(siteSelect.value || 0)
        console.log(siteSelect.value,'value')
  }

  const handleMultiSelectChange = (selectOptions) => {
    // console.log(selectOptions);
    setMultiSelectValue(selectOptions);
  };

  // console.log("multisellllllll", multiSelectValue);

  const blockHandler = (blockOption) => {
    setBlockOption(blockOption);
    setBlockVal(blockOption.value);
  };

  // var departmentCode = department.value;

  const DepartementHandler = (department) => {
    setDepartment(department);
    setDepartmentCode(department.value);
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { username, password, email, confirmpassword, mobile,address,whtsap } = inputValue;

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

  const getModifyHandler = async () => {
    if (state) {
      if (state && state.code) {
        var code = state.code;
        // var path = state.path
      }
    }
    let modifyUrl = `/api/LoadUserMasterDetails?Code=${code}`;
    try {
      setLoading(true)
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        let userCreateMaster = listData.userMasterDetails;
        let d = convertToIST(userCreateMaster[0].dob);
        // console.log('datessss:-',d)
        let userDep = listData.userDepartment;
        let Rsite = listData.reportingSites 
        console.log('Rsite',Rsite)
        if(listData.userImgs.length!==0){
        let imageObj = listData.userImgs[0]
        var finalImg = imageObj.img
        // console.log('iiiiiiiiiiiiiiii',finalImg)
        }else{
          finalImg=''
        }
          
        setInputValue({
          username: userCreateMaster[0].name,
          password: userCreateMaster[0].pwd,
          email: userCreateMaster[0].email,
          confirmpassword: userCreateMaster[0].pwd,
          mobile: userCreateMaster[0].mobNo,
          address:userCreateMaster[0].address,
          whtsap: userCreateMaster[0].wNo
        });
        // console.log('userCreateMaster',userCreateMaster)
        // if(userCreateMaster[0].imagePath != null && userCreateMaster[0].imagePath != undefined){
        // setImage(userCreateMaster[0].imagePath)}
        setImage(finalImg)
        setDates({
          dob: new Date(d)
        });
        // console.log('userppa',userCreateMaster[0].imagePath)
        let corrData = [];
        userDep.map((item) => {
          corrData.push({
            value: item.department,
            code: item.code,
            label: item.departmentName,
          });
        });
        let siteData = []
        Rsite.map((item)=>{
          siteData.push({
            Code: item.code,
           value: item.site,
           label:item.siteName
          })
        })
        // console.log('ccccccccccc', corrData)

        setMultiSelectValue([...corrData]);
        setMultisiteList([...siteData])
        setSelectedOption({
          label: userCreateMaster[0].utName,
        });
        setDepartmentCode(userCreateMaster[0].department);
        setDepartment({
          label: userCreateMaster[0].departmentName,
        });
        setSiteSelect({label: userCreateMaster[0].siteName})
        setSelectSiteCode(userCreateMaster[0].site)
        setTypeVal(userCreateMaster[0].ut);
        setBlockOption({
          label: userCreateMaster[0].activeName,
        });
        setBlockVal(userCreateMaster[0].active);
        setLoading(false)
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
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

  React.useEffect(() => {
    
    console.log(checkedItems, "checked+++++,expanded");

  }, [checkedItems]);

  // =========================userRight Modify================================

  //---------------##########----------this  code for user right add modify section------------------------------

const renderCheckboxTree = (data) => (
  <ul className="checkbox-nested">
    {data.map((item) => (
      <li key={item.value}>
        <input
          type="checkbox"
          name={item.label}
          value={item.value}
          checked={item.checked}
          onChange={(e) => handleCheckboxChange(e, item)}
          className="checkbox-input"
        />
        <label className="checkbox-label">{item.label}</label>
        {item.children.length > 0 && item.checked && renderNestedCheckboxes(item.children)}
      </li>
    ))}
  </ul>
);

const renderNestedCheckboxes = (children) => {
  return (
    <ul className="checkbox-nested">
      {children.map((childItem) => (
        <li key={childItem.value}>
          <input
            type="checkbox"
            name={childItem.label}
            value={childItem.value}
            checked={childItem.checked}
            onChange={(e) => handleCheckboxChange(e, childItem)}
            className="checkbox-input"
          />
          <label className="checkbox-label">{childItem.label}</label>
          {childItem.children && childItem.children.length > 0 && childItem.checked && renderNestedCheckboxes(childItem.children)}
        </li>
      ))}
    </ul>
  );
};


//----checkbox handler----------------------
const handleCheckboxChange = (e, item) => {
  if (state) {
    if (state && state.code) {
      var code = state.code;
    }
  }
  const { checked } = e.target;

  const updateCheckedStateRecursive = (menuItem) => {
    menuItem.checked = checked;
    if (menuItem.children && menuItem.children.length > 0) {
      menuItem.children.forEach(updateCheckedStateRecursive);
    }
  };


  updateCheckedStateRecursive(item);


  setUserRightList([...userRightList]); 
  const updateCheckedItemsRecursive = (menuItem) => {
    // console.log('MenuItem',menuItem)
    if (menuItem.checked) {
   
      setCheckedItems((prevCheckedItems) => [
        ...prevCheckedItems,
        {Code: code || 0, RCode: parseInt(menuItem.value)}
      ]);
    } else {
      // If the checkbox is unchecked, remove the item from the checkedItems array by RCode
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter(({ RCode }) => RCode !== parseInt(menuItem.value))
      );
    }
    if (menuItem.children && menuItem.children.length > 0) {
      menuItem.children.forEach(updateCheckedItemsRecursive);
    }
  };

  // Update checked items recursively
  updateCheckedItemsRecursive(item);
};



  const getUserRightModifyHandler = async () => {
    if (state) {
      if (state && state.code) {
        var code = state.code;
        // var path = state.path
      }
    }
    let Url = `/api/LoadUserRightsMenuTree?UCode=${code}`;
    console.log('url', Url)
    
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let data = got;
     
       console.log('modifyData',data)
    const updateCheckedStateAndItemsRecursive = (menuItem) => {
      // console.log(menuItem,'menuItemmmm')
      menuItem.checked = menuItem.checked === true; 
      
      if (menuItem.checked) {
       
        setCheckedItems((prevCheckedItems) => [
          ...prevCheckedItems,
          {Code:code ||0, RCode: parseInt(menuItem.value) }
        ]);
      }

      menuItem.children.forEach(updateCheckedStateAndItemsRecursive);
    };

   
    data.forEach(menuItem => {
      updateCheckedStateAndItemsRecursive(menuItem);
    });

   
    setUserRightList(data);

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

  useEffect(() => {
    if (state) {
      if (state && state.code) {
        getModifyHandler();
        getUserRightModifyHandler();
      }
    }
    // setDataCode(code)
  }, [state]);

  const imageHandler=(h)=>{
    // console.log('from user image',h[0])
    setImagePath(h[0])
  }

// ====================saveData=========================
  const saveHandler = async (e) => {
    e.preventDefault();
    if (state) {
      if (state && state.code) {
        var code = state.code;
      }
    }
    let mainArr = [];
    let siteArr =[]
    if (multiSelectValue.length > 0){
    multiSelectValue.map((item) => {
      mainArr.push({ department: item.value||0 , code: code || 0 });
    })}else{
      mainArr.push({department:0, code:code||0})
    }
    if (multiSiteList.length > 0){
   multiSiteList.map((item)=>{
  siteArr.push({Site : item.value ,Code : code || 0})
   })
  }else{
    siteArr.push({Site: 0 , Code: code || 0})
  }
    // console.log("uniqueChars arr", uniqueChars);
    const urlCreateUser = "/api/SaveUserMaster";
    // console.log('codeUsers', selectedFiles)
    var body = {
      UserMasterDetails: [
        {
          Code: code || 0,
          name: username,
          MobNo: mobile,
          pwd: password,
          email: email,
          ut: parseInt(typeVal),
          active: parseInt(blockVal),
          department: parseInt(departmentCode) || 0,
          userName: username,
          // ImagePath :image,
          Address : address,
          DOB  :dates.dob,
          WNo :whtsap,
          Site: parseInt(selectSiteCode)||0,
          ProjType : 2
        },
      ],
      UserDepartment: [...mainArr],
      UserImgs :[
        {
          Code :code||0,
          Img : image
        }
      ],
      UserRights :checkedItems || [],
      ReportingSites : [...siteArr]
    };
    // console.log("body", body);
    console.log("body", JSON.stringify(body));
    try {
      setLoading(true)
      let { res, got } = await api(urlCreateUser, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        // alert(got.msg);        
        showToastMessage(got.msg)
        setInputValue({
          username: "",
          mobile: "",
          password: "",
          email: "",
        });
        setSelectedOption("");
        setBlockOption("");
        setDepartment("");
        setMultiSelectValue([])
        if(code !== 0 && code != undefined){
          history.push('/list/4')
          // console.log('hello from user')
        }
        setLoading(false)
      } else {
        setLoading(false)
        showToastError(got.msg);
       
      }
    } catch (error) {
      setLoading(false)
      showToastError(error);
    }
  };
  // =====================================end save handler===========================================================================

  //   ----------------------------------Departement----------------------------------------

  const getDepartementList = async () => {
    var correctData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        // console.log("modifyData", correctData);
        setDepartmentList(correctData);
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

   // ----------------listLoad -in Type Field--------------------
   const getUserTypeList = async () => {
    let currData=[];
    let Url = `/api/LoadMasterData?MasterType=17`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((element) => {
           currData.push({value:element.code,label:element.name})
        });
          //  console.log('ccccccccc%%%',currData)
           setTypeList(currData);
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
  // ------------show/hide-------
  const togglePasswordVisibility = () => {
    setVisibility(prevShowPassword => !prevShowPassword);
  };
  // -------------User-Rigths------------------------------
  const getUserRights = async () => {
    let currData = [];
    let Url = `/api/LoadRightsManuTree?ProjType=2`;
    // console.log("url", Url);
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let data = got;
        
        // console.log('***********',data)

        setUserRightList(data);
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
  useEffect(() => {
    getDepartementList();
    getUserTypeList();
    getSiteList()
    if(code === 0){
      getUserRights();

    }
      
  }, []);


  

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //   }
  // };
  const onImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <>
      <ReactToast/>
      <UserPage
         typelist={typelist}
         multiSiteHandler={multiSiteHandler}
         multiSiteList={multiSiteList}
         selectHandler={selectHandler}
         selectedOption={selectedOption}
         blockOption={blockOption}
         setBlockOption={setBlockOption}
         blockList={block_list}
         handleInputField={handleInputField}
         inputValue={inputValue}
         blockHandler={blockHandler}
         saveHandler={saveHandler}
         modifySelect={modifySelect}
         departmentList={departmentList}
         DepartementHandler={DepartementHandler}
         department={department}
         typeVal={typeVal}
         handleMultiSelectChange={handleMultiSelectChange}
         multiSelectValue={multiSelectValue}
         loading={loading}
         togglePasswordVisibility={togglePasswordVisibility}
         visibility={visibility}
         imageHandler={imageHandler}
         handleDateChange={handleDateChange}
         dates={dates}
         image={image}
         onImageChange={onImageChange}
        //  setExpanded={setExpanded}
        //  expanded={expanded}
        //  setChecked={setChecked}
        //  checked={checked}
         siteList={siteList}
         siteSelect={siteSelect}
         selectSiteHandler={selectSiteHandler}
         nodes={userRightList}
         renderCheckboxTree={renderCheckboxTree}
         userRightList={userRightList}
      />
    </>
  );
};
export default UserComp;
