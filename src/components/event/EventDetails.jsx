import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import EventCards from "../cards";
import useFetch from "../Hooks/useFetch";
import { Base64ImageConverter } from "./Base64ImageConverter";
import ReactLoader from "../CustomComp/ReactLoader";
import "../../assets/css/loaders.css";
import Item from "antd/lib/list/Item";
import SubmitButton from "../CustomComp/SubmitButton";
import ReviewModal from "./ReviewModal";
import $ from 'jquery'

const EventDetails = () => {
  let api = useFetch();
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId
  }
  const [eventList, setEventList] = React.useState([]);
  const [reviewList, setReviewList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getEventList = async () => {
    let eventUrl = `/api/LoadEventDetails?Code=0&WI=1&Ucode=${userId}`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setEventList(list);
        console.log("llllist43", list);
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
  const handleClick = (code) => {
    console.log(`Clicked code: ${code}`);
    $("#add_task").modal("show");
    // const selectedItem = eventList.find(item => item.code == code)
   
    // console.log('selected',selectedItem)
    getReviewList(code);
  };

  const getReviewList = async (code) => {
    let eventUrl = `/api/EventReview?Code=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setReviewList(list);
        console.log("llllist45", list);
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
    getEventList();
    // getReviewList()
  }, []);

  return (
    <div className="page-wrapper">
      <ReviewModal reviewList={reviewList}/>
      <Helmet>
        <title>Event - Event&Management</title>
        <meta name="description" content="Event Page" />
      </Helmet>
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="crms-title row bg-white mb-3">
          <div className="col  p-0">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fa fa-object-group" aria-hidden="true" />
              </span>{" "}
              Events Details{" "}
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Event</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-wrap">
            {eventList.map((item, i) => {
              return (
                <>
                  <div className="col-lg-12 col-12 mb-4" key={i}>
                    <div className="card">
                      <section className="comp-section" id="comp_tabs">
                        <div className="card-body">
                          <h4 className="card-title">{item.name}</h4>
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                //   href="#basictab1"
                                href={`#basictab1${i}`}
                                data-bs-toggle="tab"
                              >
                                About
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                //   href="#basictab2"
                                // href={`#basictab2${i}`}
                                // data-bs-toggle="tab"
                                onClick={() => {
                                  handleClick(item.code);
                                }}
                              >
                                Review
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              className="tab-pane show active"
                              id={`basictab1${i}`}
                            >
                              <div className="event_ccontent">
                                <div className="event_img mb-2">
                                  <Base64ImageConverter
                                    base64String={item.img}
                                    style={{
                                      objectFit: "fill",
                                      height: "88vh",
                                      
                                      // width: "100px",
                                      // borderRadius: "50%",
                                    }}
                                  />
                                </div>
                                <div className="event_about mb-2">
                                  <h4>Event Description</h4>
                                  <p className="mb-5">{item.det}</p>
                                </div>
                                

                                <div className="event_about event_details mb-2 p-0">
                                  <h4>Event Details</h4>
                                  <ul className="">
                                    <li>
                                      <span> Customer Name : </span>
                                      {item.customerName}
                                    </li>
                                    <li>
                                      <span>Mobile No. : </span>
                                      {item.phNo}
                                    </li>
                                    <li>
                                      <span> Date : </span>
                                      {item.eDate}
                                    </li>
                                    <li>
                                      <span>Time : </span>
                                      {item.eTime} (UTC)
                                    </li>

                                    <li>
                                      <span>Venue : </span>
                                      {item.eAdd}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* <SubmitButton btnName="Review" onClick={() => {
                                  handleClick(item.code);
                                }}/> */}
                            </div>
                            
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
