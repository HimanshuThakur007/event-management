import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PieChart from "./piechart";
import useFetch from "../Hooks/useFetch";
import VerticalBarChart from "./verticalbarchart/VerticalBarChart";
import { convertDate } from "../CustomComp/DateTimeInput";
import ReactLoader from "../CustomComp/ReactLoader";

var eventCount;
var templateCount;
var contactCount;
const Dashboard = () => {
  let api = useFetch();
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  // const [tableDataList, setTableDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [unHappier, setUnHappier] = React.useState([]);
  const [Happier, setHappier] = React.useState([]);
  const [overAll, setOverAll] = React.useState([]);
  const [reviewCount, setReviewCount] = React.useState(0);
  // console.log("ssssdate",startDate,endDate)


 

  var date = new Date();
  var mnth;
  var day;
  var updatedData;
  day = ("0" + date.getDate()).slice(-2);
  console.log('datesss', date.getFullYear()-1)
  if(date.getMonth() === 0){
   mnth = ("0" + date.getMonth()+1).slice(-2)
   updatedData = [2023, mnth, day].join("/");
   console.log('upData', updatedData)
  }else{
   mnth = ("0" + date.getMonth()).slice(-2)
   updatedData = [date.getFullYear(), mnth, day].join("/");
   console.log('elsemmm', mnth)
  }


  const dashBoardReport = async () => {
    let eventUrl = `/api/DashBoardReports`;
    // console.log("url", eventUrl)
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        let overall = list[0].overallhappy;
        let Happy = list[0].tophappysite;
        let unHappy = list[0].topunhappysite;
        console.log("happy", unHappy);
        setUnHappier(unHappy);
        setHappier(Happy);
        setOverAll(overall);
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

  // ===========================Dashboard-count====================================
  const getdashBoardCount = async () => {
    let eventUrl = `/api/ReturnTotalReviews`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        let review = list[0].totalReviews
        eventCount = list[0].totalEvents
        templateCount = list[0].totalTemplates
        contactCount=list[0].totalContacts
        setReviewCount(review)
        // console.log('llllist43', review)
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
    dashBoardReport();
    getdashBoardCount();
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
      {loading ? (
          <ReactLoader loaderClass="position-absolute" loading={loading} />
        ) : null}
      <div className="content container-fluid">
        <div className="crms-title row bg-white mb-4">
          <div className="col">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fas fa-table"></i>
              </span>{" "}
              <span>Dashboard</span>
            </h3>
          </div>
          <div className="col text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
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
                <h3 className="expovent__count-number">{eventCount}+</h3>
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
                <h3 className="expovent__count-number">{templateCount}+</h3>
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
                <h3 className="expovent__count-number">{contactCount}+</h3>
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
