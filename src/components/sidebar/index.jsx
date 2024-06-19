import React from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import {
  BiBarChartAlt2,
  BiCalendarAlt,
  BiBookContent,
  BiCog,
  BiUserPin,
  BiData,
  BiHomeAlt,
  BiMobileAlt,
  BiCalendarEvent,
  BiTask,
  BiUser,
} from "react-icons/bi";
import { SiMastercomfig } from "react-icons/si";
import {MdOutlineReviews} from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import useFetch from "../Hooks/useFetch";
import ReactLoader from "../CustomComp/ReactLoader";
import SidebarMenu from "./SidebarMenu";

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
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var code = JSON.parse(userData).UserId
  }
  // console.log("pathname&code", code);

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
        console.log("sideNavData", JSON.stringify(got));
        let navData = got;
        setSideBarData(navData);
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
        
      </Scrollbars>
    </div>
  );
};
export default withRouter(SidebarNav);

