import React from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { avatar17 } from "../imagepath";
import {
  BiAward,
  BiBarChartAlt2,
  BiCalendarAlt,
  BiClipboard,
  BiBookContent,
  BiCog,
  BiCoinStack,
  BiCommand,
  BiCube,
  BiUserPin,
  BiData,
  BiDockLeft,
  BiDockTop,
  BiEnvelope,
  BiError,
  BiGridAlt,
  BiHomeAlt,
  BiMenu,
  BiMobileAlt,
  BiCalendarEvent,

  BiPodcast,
  BiSearchAlt2,
  BiStation,
  BiTask,
  BiUser,
} from "react-icons/bi";
import { SiMastercomfig } from "react-icons/si";
import {MdOutlineReviews} from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RiChatFollowUpLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { FaUserGear } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import useFetch from "../Hooks/useFetch";
import { JsonRequestError } from "fullcalendar";
import ReactLoader from "../CustomComp/ReactLoader";
import SidebarMenu from "./SidebarMenu";
// import ReactLoader from "../CommonFile/ReactLoader";
// import SideBarComp from "./SideBarComp";

const SidebarNav = (props) => {
  const param = useParams();
  let api = useFetch();
  // console.log("paramssssssss", param);
  const exclusionArray = [
    "login",
    "register",
    "forgot-password",
    "error-404",
    "error-500",
    "email",
    "mail-view",
    "components",
  ];
  if (exclusionArray.indexOf(props.location.pathname.split("/")[1]) >= 0) {
    return "";
  }
  const { location } = props;
  let pathname = location.pathname;
  let history = useHistory();
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var username = JSON.parse(userData).Admin;
    var code = JSON.parse(userData).UserId
  }
  console.log("pathname&code", code);

  // --------sidebar jQUERRY-------------
  var Sidemenu = function () {
    this.$menuItem = $("#sidebar-menu Link");
  };

  function init() {
    var $this = Sidemenu;
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $(".sub-menus", $(this).parents(".sub-menus:first")).slideUp(350);
        $("a", $(this).parents(".sub-menus:first")).removeClass("subdrop");
        $(this).next(".sub-menus").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next(".sub-menus").slideUp(350);
      }
    });
    $("#sidebar-menu ul li.submenu a.active")
      .parents("li:last")
      .children("a:first")
      .addClass("active")
      .trigger("click");
  }

  const icons = {
    "<BiHomeAlt />": <BiHomeAlt />,
    "<BiCog />": <BiCog />,
    "<SiMastercomfig />": <SiMastercomfig />,
    "<FiUserPlus />": <FiUserPlus />,
    "<BiBookContent />": <BiBookContent />,
    "<BiUserPin />": <BiUserPin />,
    "<BiUser />":<BiUser />,
    "<BiData />":<BiData />,
    "<BiCalendarAlt />": <BiCalendarAlt />,
    "<BiBarChartAlt2 />":<BiBarChartAlt2 />,
    "<BiMobileAlt />":<BiMobileAlt/>,
    "<BiCalendarEvent />":<BiCalendarEvent />,
    "<BiTask />":<BiTask />,
    "<MdOutlineReviews />":<MdOutlineReviews />
  };

  // Sidebar Initiate
  const [sideBarData, setSideBarData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // ---------------dynamic-sideBar-Tree--------------------------
  const getDynamicNavbarList = async () => {
    let Url = `/api/LoadUserMenuTree?UserCode=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log("sideNavData", got);
        let navData = got;
        setSideBarData(navData);
        //  console.log('ccccccccc%%%',currData)
        // setTypeList(currData);
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
    init();
    if(userData != null){
    getDynamicNavbarList();
    }
  }, []);

  // -------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="sidebar" id="sidebar">
      {/* <SideBarComp/> */}
      <Scrollbars>
      {loading ? (
        <ReactLoader
          loaderClass="position-absolute"
          loading={loading}
        />
        
      ) : null}
      {/* <SideBarComp /> */}
      <SidebarMenu menuItems={sideBarData}/>
        {/* <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="nav-item nav-profile">
                <Link to="/" className="nav-link">
                  <div className="nav-profile-image">
                    <img src={avatar17} alt="profile" />
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">
                      {username || ""}
                    </span>
                    <span className="text-white text-small">
                      S&S Enterprises
                    </span>
                  </div>
                  <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                </Link>
              </li>
              <li className="menu-title">
                <span>Main</span>
              </li>

              <Tree data={sideBarData} pathname={pathname} icons={icons} />
            </ul>
          </div>
        </div> */}
      </Scrollbars>
    </div>
  );
};
export default withRouter(SidebarNav);

export function Tree({ data, pathname, icons, ...otherProps }) {
  const [showChildFag, setShowChildFlag] = React.useState(false);
  const [currentCode, setCurrentCode] = React.useState(0);
  const [childData, setChildData] = React.useState([]);

 
    return (
     <>
      {
        data && data.length > 0 ? data.map( item => (
          <>
            {item && item.children && item.children.length > 0 ? (
              <>
          <li key={item.value} className="submenu dropdown" onClick={()=>{
            let data = item.children
            setChildData(data)
            setCurrentCode(item.value)
            setShowChildFlag(!showChildFag)}
            
          }>
            <Link
              to="#"
              className={`${
              pathname === item.address ? "active subdrop" : "dropdown-toggle"
              }`}
            >
              {" "}
              {/* <FiUserPlus /> */}
              {icons[item["imgPath"]]}
              <span>{item.label} </span>
              {/* <span className="menu-arrow dropdown-toggle"  /> */}
            </Link>
          
           
          </li>
          {
            showChildFag && showChildFag == true && currentCode == item.value ? (
            <ShowChildren
            childData={childData}
            pathname={pathname}
            icons={icons}
            />) : null
          }
          </>
          ): (
            <li key={item.value}>
                <Link
                  className={`${pathname === item.address ? "active" : ""}`}
                  to={item.address}
                >
                  {/* <BiHomeAlt /> */}
                  {icons[item["imgPath"]]}
                  <span>{item.label}</span>
                </Link>
              </li>
            )} 
               
                </>
               )) : null
              }
              
         
     
      </>
    )
}

export function ShowChildren({ childData, pathname, icons, ...otherProps }) {

  const [showChildFag, setShowChildFlag] = React.useState(false);
  const [child2Data, setChild2Data] = React.useState([]);
  const [currentCode, setCurrentCode] = React.useState(0);
  return childData && childData.length > 0
    ? childData.map((item, index) => {
        return (
          <>
            {item && item.children && item.children.length > 0 ? (
              <>
              
                <li key={item.value} className="submenu" onClick={()=>{
                  let data = item.children
                  setChild2Data(data)
                  setCurrentCode(item.value)
                  setShowChildFlag(!showChildFag)}
                  
                }>
                  <Link
                    to="#"
                    className={`${
                      pathname === item.address ? "active subdrop" : "dropdown-toggle"
                    }`}
                  >
                    {" "}
                    {/* <FiUserPlus /> */}
                    {icons[item["imgPath"]]}
                    <span>{item.label}</span> 
                    {/* <span className="menu-arrow rotate-{90}" /> */}
                  </Link>
                </li>
                {
                  showChildFag && showChildFag == true && currentCode == item.value ? (
                   <Tree data={child2Data} pathname={pathname} icons={icons} />) : null 
                  }
              </>
            ) : (
              <li key={item.value}>
                <Link
                  className={`${pathname === item.address ? "active" : ""}`}
                  to={item.address}
                >
                  {/* <BiHomeAlt /> */}
                  {icons[item["imgPath"]]}
                  <span>{item.label}</span>
                </Link>
              </li>
            )}
          </>
        );
      })
    : null;
}
