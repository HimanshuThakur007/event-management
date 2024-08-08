import React, { useEffect } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import PageHelmet from "../CustomComp/PageHelmet";
import PageHeader from "../CustomComp/PageHeader";
import CardComp from "../CustomComp/CardComp";
import InputField from "../CustomComp/InputField";
import InputSelect from "../CustomComp/InputSelect";
import SubmitButton from "../CustomComp/SubmitButton";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactToast,{showToastError,showToastMessage} from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import useFetch from "../Hooks/useFetch";

var navData = [];
const WhatsAppConfigPage = (props) => {
  let api = useFetch()
  var [whatsAppbody2, setWhatsAppbody2]= React.useState([])
  const [sideBarAddress, setSideBarAddress] = React.useState([]);
  const history = useHistory();
  const Ratingdata =[
    {
    value:1,label:"1-Star"
},
    {
    value:2,label:"2-Star"
},
    {
    value:3,label:"3-Star"
},
    {
    value:4,label:"4-Star"
},
    {
    value:5,label:"5-Star"
},
]

var custTemplate =[{
  value:1,label:"<CUSTOMER_NAME>"
}]
let iconStyles = { color: "grey" };

const [inputValue, setInputValue] = React.useState({
  BaseURL :'',
  Parameter1H :'',Parameter1V :'',Parameter2H :'',Parameter2V :'',Parameter3H :'',
  Parameter3V :'',Parameter4H :'', Parameter4V :'',MobileH :'',MessageH :'',Template:''
})


const {BaseURL ,Parameter1H ,Parameter1V ,Parameter2H ,Parameter2V ,Parameter3H, 
  Parameter3V ,Parameter4H , Parameter4V ,MobileH ,MessageH ,Template } = inputValue
const [selectRating,setSelectRating] = React.useState(null);
const [templateName,setTemplateName] = React.useState(null);
const [whatsAppBody, setWhatsAppBody] = React.useState('')
const [currentIndex, setCurrentIndex] = React.useState(0)
const [loading, setLoading] = React.useState(false);
  
  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectHandler = (select) => {
    let ci = select.value - 1;
    setCurrentIndex(ci)
    setSelectRating(select)
    console.log(select)
    document.getElementById('rating').value = whatsAppbody2 && whatsAppbody2[ci] &&  whatsAppbody2[ci].template ? whatsAppbody2[ci].template : '';
  };
  const selectTemplateHandler = (select) => {
    // let tempName = select.label
    setTemplateName(select)
    var dear = `${select.label}`
    var locMessage= whatsAppBody
    locMessage= locMessage.concat(dear)
    console.log(select)
    setWhatsAppBody(`${locMessage}`)
  };

  let map = {};

  const whatsAppDataHandler =()=> {
    let tempArr = [...whatsAppbody2]
  let index = tempArr.findIndex((item)=> item.Rate == selectRating.value);
  console.log('index', index)
   if(index !== -1){
    tempArr[index] = {Rate:selectRating.value||0,template:Template||''}
   }else{
     console.log(';push')
    tempArr[currentIndex]= ({Rate:selectRating.value||0,template:Template||''})
   }
  setWhatsAppbody2(tempArr)
    console.log('www333',tempArr)
  };

  // =========================save-handler=========================================
  const saveHandler = async (e) => {
    e.preventDefault();

    const urlCustomer = "/api/WhatsAppConfig";
  
    var body = {
      BaseURL : BaseURL||'',
      Parameter1H:Parameter1H||'' ,
      Parameter1V:Parameter1V||'' ,
      Parameter2H:Parameter2H||'' ,
      Parameter2V:Parameter2V||'' ,
      Parameter3H:Parameter3H||'', 
      Parameter3V:Parameter3V||'' ,
      Parameter4H:Parameter4H||'' , 
      Parameter4V:Parameter4V||'' ,
      MobileH:MobileH||'' ,
      MessageH:MessageH||'' ,
      WAppBody:whatsAppBody||'',
      Template:Template||'',
      RatingTemplate :[...whatsAppbody2]
    };
    console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        const userData = sessionStorage.getItem("userData");
        if (userData !== null) {
          var code = JSON.parse(userData).UserId;
        }
        await getDynamicNavbarList(code);
        const addresses = getAllAddresses(navData); 
        const homeAddress = addresses.find((address) =>
          address.includes("/")
        );

        if (homeAddress) {
          history.push(homeAddress);
        } else if (addresses.length > 0) {
          // Push to the first address found
          history.push(addresses[0]);
        } else {
          console.log("No address found in navbar data");
        }
        showToastMessage(got.msg);
        setInputValue({
          BaseURL :'',
          Parameter1H :'',Parameter1V :'',Parameter2H :'',Parameter2V :'',Parameter3H :'',
          Parameter3V :'',Parameter4H :'', Parameter4V :'',MobileH :'',MessageH :'',Template:''
        });
        loadconfigList()
        setLoading(false);
     
      } else {
        setLoading(false);
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };

  // ========================modify-Handler====================
  const loadconfigList = async () => {
    let Url = `/api/LoadWhatsAppConfig`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        // let temp = listData.ratingTemplate
        console.log("ConfigloadData", listData);
        if(listData){
        setInputValue({
          BaseURL:listData.baseURL,
          Parameter1H:listData.parameter1H,
          Parameter1V:listData.parameter1V,
          Parameter2H:listData.parameter2H,
          Parameter2V:listData.parameter2V,
          Parameter3H:listData.parameter3H,
          Parameter3V:listData.parameter3V,
          Parameter4H:listData.parameter4H,
          Parameter4V:listData.parameter4V,
          MobileH:listData.mobileH,
          MessageH:listData.messageH,

          // Template:listData
        });
        setWhatsAppbody2(listData.ratingTemplate)
        setWhatsAppBody(listData.wAppBody)
        console.log(listData.ratingTemplate)
      }
        // temp.for
       

        // setConfigList(correctData);
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
  
    loadconfigList()
    
  },[])

  const getDynamicNavbarList = async (code) => {
    let Url = `/api/LoadUserMenuTree?UserCode=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log("sideNavData", JSON.stringify(got));
        navData = got;
        // getAllAddresses(navData)
        setSideBarAddress(navData);
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

  function getAllAddresses(data) {
    const addresses = [];

    function traverse(node, parentAddress = "") {
      const currentAddress = parentAddress + node.address;
      addresses.push(currentAddress);

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          traverse(child, currentAddress);
        });
      }
    }

    data.forEach((item) => {
      traverse(item);
    });
    console.log(addresses, "aaadddtttt");
    return addresses;
  }

  return (
    <>
    <ReactToast/>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="WhatsApp Config"
          helmetName="description"
          helmetContent="WhatsApp Config"
        />
        {loading ? (
        <ReactLoader
          loaderClass="position-absolute"
          loading={loading}
        />
      ) : null}
        <div className="content container-fluid">
          {/* Page Header */}
          <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="WhatsApp Configuration"
            disableTitle="WhatsApp Configuration"
          />

          {/* /Page Header */}

          <CardComp
            cardTitle="WhatsApp Configuration"
            cardBodyTitle="Configuration"
          >
            <form onSubmit={saveHandler}>
              <div className="row">
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    name="BaseURL"
                    labelName="URL"
                    value={BaseURL}
                    onChange={handleInputField}
                    required
                  />
                </div>
                <div className="col-xl-6"></div>
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    name="Parameter1H"
                    labelName="UserId"
                    value={Parameter1H}
                    onChange={handleInputField}
                    required
                  />
                  <InputField
                    type="text"
                    name="Parameter2H"
                    labelName="Password"
                    value={Parameter2H}
                    onChange={handleInputField}
                    
                  />
                  <InputField
                    type="text"
                    name="Parameter3H"
                    labelName="Addt'l Parameter1"
                    value={Parameter3H}
                    onChange={handleInputField}
                    
                  />
                  <InputField
                    type="text"
                    name="Parameter4H"
                    labelName="Addt'l Parameter2"
                    value={Parameter4H}
                    onChange={handleInputField}
                    
                  />
                  <InputSelect
                    labelClass="col-lg-3"
                   
                    selectName="Rating"
                    selectClass="col-lg-9"
                    name="selectRating"
                    placeholder="Select Rating"
                    value={selectRating||{value:1,label:"1-Star"}}
                    onChange={selectHandler}
                    options={Ratingdata}
                
                  />

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label">Body</label>
                    <div className="col-lg-9">
                      <textarea
                        type="text"
                        name="Template"
                        rows="4"
                        className="form-control"
                        placeholder="body"
                        id='rating'
                        // value={Template}
                        defaultValue={whatsAppbody2 && whatsAppbody2[0] && whatsAppbody2[0].template ? whatsAppbody2[0].template : ''}
                        onChange={handleInputField}
                        onBlur={whatsAppDataHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    name="Parameter1V"
                    labelName="Value"
                    value={Parameter1V}
                    onChange={handleInputField}
                    required
                  />

                  <InputField
                    type="text"
                    name="Parameter2V"
                    labelName="Value"
                    value={Parameter2V}
                    onChange={handleInputField}
                  />

                  <InputField
                    type="text"
                    name="Parameter3V"
                    labelName="Value"
                    value={Parameter3V}
                    onChange={handleInputField}
                  />
                  <InputField
                    type="text"
                    name="Parameter4V"
                    labelName="Value"
                    value={Parameter4V}
                    onChange={handleInputField}
                  />
                  <InputField
                    type="text"
                    min="0"
                    name="MessageH"
                    labelName="Message(P)"
                    value={MessageH}
                    onChange={handleInputField}
                  />
                  <InputField
                    type="text"
                    min="0"
                    name="MobileH"
                    labelName="Mobile(p)"
                    value={MobileH}
                    onChange={handleInputField}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Birthday Wishes</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                      <div className="col-xl-6">
                        <InputSelect
                          labelClass="col-lg-3"
                          selectName="Tag"
                          selectClass="col-lg-9"
                          name="selectRating"
                          placeholder="Select Rating"
                          value={templateName}
                          onChange={selectTemplateHandler}
                          options={custTemplate}
                         
                        />
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group row">
                          <label className="col-lg-2 col-form-label">
                            Body
                          </label>
                          <div className="col-lg-10">
                            <textarea
                              type="text"
                              name="address"
                              rows="4"
                              // defaultValue={whatsAppbody2[currentIndex]}
                              value={whatsAppBody}
                              onChange={(e)=>setWhatsAppBody(e.target.value)}
                              className="form-control"
                              placeholder="body"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              <SubmitButton parentClass="text-end" btnName="Save" />
            </form>
          </CardComp>
          {/* 
          <CardComp cardTitle="Birthday Wishes" cardBodyTitle="Message">
            <div className="form-group row">
              <label className="col-lg-2 col-form-label">Body</label>
              <div className="col-lg-10">
                <textarea
                  type="text"
                  name="address"
                  rows="4"
                  className="form-control"
                  placeholder="body"
                />
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Send Wisheses" />
          </CardComp> */}
        </div>
      </div>
    </>
  );
};

export default WhatsAppConfigPage;
