import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PieChart from "./piechart";
import HorizontalBarChart from "./barchart/horizontalchart";
import BarChart from "./barchart";
import LineChart from "./linechart";
import SingleChart from "./linechart/singlelinechart";
import TotalRevenuechart from "./barchart/totalreveue";
import Salesstatictschart from "./barchart/salesstatistics";
import Completedtaskchart from "./barchart/completedtaks";
import PieChart2 from "./piechart/piechart2";
import DoughnutChart from "./piechart/piechart2";
import DoughnutChart1 from "./piechart/piechart3";
import { BiUser } from "react-icons/bi";
import useFetch from "../Hooks/useFetch";
import VerticalBarChart from "./verticalbarchart/VerticalBarChart";
import { convertDate } from "../CustomComp/DateTimeInput";

const Dashboard = () => {
  let api = useFetch();
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [eventList, setEventList] = React.useState(0);
  const [templateList, setTemplateList] = React.useState(0);
  const [tableDataList, setTableDataList] = React.useState([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  React.useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Set start date to January 1st of the current year
    const startDate = new Date(currentYear, 0, 1);
    const formattedStartDate = convertDate(startDate)
    setStartDate(formattedStartDate);

    // Set end date to December 31st of the current year
    const endDate = new Date(currentYear, 11, 31);
    const formattedEndDate = convertDate(endDate)
    setEndDate(formattedEndDate);

    getTableDataList(startDate,endDate)
  }, []);
  console.log("ssssdate",startDate,endDate)
  const getEventList = async () => {
    let eventUrl = `/api/LoadEventDetails?Code=0`;
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setEventList(list.length);
        // console.log('llllist43', list)
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  const getTemplateList = async () => {
    let eventUrl = `/api/LoadTemplateDetails?Code=0`;
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setTemplateList(list.length);
        // console.log("llllist43", list);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  const getTableDataList = async (startDate,endDate) => {
    let sDate=convertDate(startDate);
    let eDate=convertDate(endDate)
    let eventUrl = `/api/EventCustomerList?FDate=${sDate}&EDate=${eDate}`;
    console.log("url", eventUrl)
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        console.log("contactList", list);
        setTableDataList(list.length);

        // setTemplateList(currData);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };
  const [unHappier, setUnHappier] = React.useState([]);
  const [Happier, setHappier] = React.useState([]);
  const [overAll, setOverAll] = React.useState([]);
  const [reviewCount, setReviewCount] = React.useState(0);

  const dashBoardReport = async () => {
    //   var unHappy=[];
    // var Happy=[];
    // var overall=[];
    let eventUrl = `/api/DashBoardReports`;
    // console.log("url", eventUrl)
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        console.log("DashboardData", list);
        // list.map((item)=>{
        //   return (
        //     item.topunhappysite.map((unhappy)=>{
        //       return(
        //          unHappy.push({name:unhappy.sitename,data:unhappy.unhappyper})
        //       )
        //     })
        //   )
        // })
        let overall = list[0].overallhappy;
        let Happy = list[0].tophappysite;
        let unHappy = list[0].topunhappysite;
        console.log("happy", unHappy);
        setUnHappier(unHappy);
        setHappier(Happy);
        setOverAll(overall);

        // setTemplateList(currData);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  // ===========================total ReviewList====================================
  const getreviewCount = async () => {
    let eventUrl = `/api/ReturnTotalReviews`;
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        let review = list[0].totalReviews
        setReviewCount(review)
        console.log('llllist43', review)
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  React.useEffect(() => {
    dashBoardReport();
    getreviewCount()
  }, []);

  React.useEffect(() => {
    if (userDatas != null) {
      
      getEventList();
      getTemplateList();
    }
  }, []);
  const datas = unHappier.map((obj) => obj.sitename);
  const per = unHappier.map((obj) => obj.unhappyper);
  const hdatas = Happier.map((obj) => obj.sitename);
  const hper = Happier.map((obj) => obj.happyper);
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Dashboard- Event&Management</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      <div className="content container-fluid">
        <div className="crms-title row bg-white mb-4">
          <div className="col">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fas fa-table"></i>
              </span>{" "}
              <span>Event Dashboard</span>
            </h3>
          </div>
          <div className="col text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Event Dashboard</li>
            </ul>
          </div>
        </div>
        {/* <div className="row graphs">
          <div className="col-lg-3 col-6">
            <div className="card h-100" style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h3 className="card-title">Total Events</h3>
              
                <div className="row">
                  <div className="col-lg-6">
                    <label className="col-form-label">
                      <BiUser /> events <span className="text-danger"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="card h-100" style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h3 className="card-title">Total Templates</h3>
                <div className="row">
                  <div className="col-xl-6">
                    <label className="col-form-label">
                      <BiUser /> templates:{" "}
                      <span className="text-danger"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="card h-100" style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h3 className="card-title">Total Contacts</h3>
                <div className="row">
                  <div className="col-xl-6">
                    <label className="col-form-label">
                      <BiUser /> Contacts <span className="text-danger"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="card h-100" style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h3 className="card-title">Total Review</h3>
                <div className="row">
                  <div className="col-xl-6">
                    <label className="col-form-label">
                      <BiUser /> Total:{" "}
                      <span className="text-danger"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row g-20">
          <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
            <div className="expovent__count-item mb-20">
              <div
                className="expovent__count-thumb include__bg transition-3"
                data-background="assets/img/bg/count-bg.png"
              ></div>
              <div className="expovent__count-content">
                <h3 className="expovent__count-number">{eventList}+</h3>
                <span className="expovent__count-text">Total Events</span>
              </div>
              <div className="expovent__count-icon">
                <i className="flaticon-group"></i>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
            <div className="expovent__count-item mb-20">
              <div
                className="expovent__count-thumb include__bg transition-3"
                data-background="assets/img/bg/count-bg.png"
              ></div>
              <div className="expovent__count-content">
                <h3 className="expovent__count-number">{templateList}+</h3>
                <span className="expovent__count-text">Total Templates</span>
              </div>
              <div className="expovent__count-icon">
                <i className="flaticon-speaker"></i>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
            <div className="expovent__count-item mb-20">
              <div
                className="expovent__count-thumb include__bg transition-3"
                data-background="assets/img/bg/count-bg.png"
              ></div>
              <div className="expovent__count-content">
                <h3 className="expovent__count-number">{tableDataList}+</h3>
                <span className="expovent__count-text">Total Contacts</span>
              </div>
              <div className="expovent__count-icon">
                <i className="flaticon-reminder"></i>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
            <div className="expovent__count-item mb-20">
              <div
                className="expovent__count-thumb include__bg transition-3"
                data-background="assets/img/bg/count-bg.png"
              ></div>
              <div className="expovent__count-content">
                <h3 className="expovent__count-number">{reviewCount}+</h3>
                <span className="expovent__count-text">Total Review</span>
              </div>
              <div className="expovent__count-icon">
                <i className="flaticon-ticket-1"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="row graphs mt-3">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Overall Percentage</h3>
                <PieChart overAll={overAll} />
              </div>
            </div>
          </div>
        
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Happy Sites</h3>
                <VerticalBarChart vlabels={hdatas} data={hper} />
              </div>
            </div>
          </div>
          
        </div>
        {/* ---------------------piechart2----------------- */}
        {/* <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Total Event</h3>
                <DoughnutChart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Total Template</h3>
                <DoughnutChart1 />
              </div>
            </div>
          </div>
        </div> */}
        <div className="row graphs">
        <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Need Improvement</h3>
                <VerticalBarChart vlabels={datas} data={per} />
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
