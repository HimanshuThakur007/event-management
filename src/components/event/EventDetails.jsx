import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import EventCards from "../cards";
import useFetch from "../Hooks/useFetch";
import { Base64ImageConverter } from "./Base64ImageConverter";
import ReactLoader from "../CustomComp/ReactLoader";
import "../../assets/css/loaders.css";
import Item from "antd/lib/list/Item";

const EventDetails = () => {
  let api = useFetch();
  const [eventList, setEventList] = React.useState([]);
  const [reviewList, setReviewList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getEventList = async () => {
    let eventUrl = `/api/LoadEventDetails?Code=0`;
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
                  <div className="col-lg-6 col-12 mb-4" key={i}>
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
                                href={`#basictab2${i}`}
                                data-bs-toggle="tab"
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
                                  />
                                </div>
                                <div className="event_about mb-2">
                                  <h4>Event Description</h4>
                                  <p className="mb-5">{item.det}</p>
                                </div>
                                {/* 
                          <div className="event_about">
                            <h4>Event’s Objectives</h4>
                            <p className="mb-5"></p>
                          </div> */}

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
                            </div>
                            <div className="tab-pane" id={`basictab2${i}`}>
                              {/* coming soon........ */}
                              <div>
                                {reviewList.map((obj)=>{
                                    return(
                                        <>
                                        
                              <div className="event_ccontent">
                                <div className="event_about event_details mb-2 p-0">
                                  <h5>Review By :-  <span style={{color:'blue'}}>{obj.name}</span></h5>
                                  <ul className="">
                                  {/* <li>
                                      <span> Name : </span>
                                      {obj.name}
                                    </li> */}
                                    <li>
                                      <span> Description : </span>
                                      {obj.desc}
                                    </li>
                                    <li>
                                      <span>Mobile No. : </span>
                                      {obj.mobNo}
                                    </li>
                                   
                                    <li>
                                      <span>Remark : </span>
                                      {obj.remark}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                                       
                                        </>
                                    )
                                })}
                                
                                {/* <svg
                                  class="bike"
                                  viewBox="0 0 48 30"
                                  width="48px"
                                  height="30px"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1"
                                  >
                                    <g transform="translate(9.5,19)">
                                      <circle
                                        class="bike__tire"
                                        r="9"
                                        stroke-dasharray="56.549 56.549"
                                      />
                                      <g
                                        class="bike__spokes-spin"
                                        stroke-dasharray="31.416 31.416"
                                        stroke-dashoffset="-23.562"
                                      >
                                        <circle class="bike__spokes" r="5" />
                                        <circle
                                          class="bike__spokes"
                                          r="5"
                                          transform="rotate(180,0,0)"
                                        />
                                      </g>
                                    </g>
                                    <g transform="translate(24,19)">
                                      <g
                                        class="bike__pedals-spin"
                                        stroke-dasharray="25.133 25.133"
                                        stroke-dashoffset="-21.991"
                                        transform="rotate(67.5,0,0)"
                                      >
                                        <circle class="bike__pedals" r="4" />
                                        <circle
                                          class="bike__pedals"
                                          r="4"
                                          transform="rotate(180,0,0)"
                                        />
                                      </g>
                                    </g>
                                    <g transform="translate(38.5,19)">
                                      <circle
                                        class="bike__tire"
                                        r="9"
                                        stroke-dasharray="56.549 56.549"
                                      />
                                      <g
                                        class="bike__spokes-spin"
                                        stroke-dasharray="31.416 31.416"
                                        stroke-dashoffset="-23.562"
                                      >
                                        <circle class="bike__spokes" r="5" />
                                        <circle
                                          class="bike__spokes"
                                          r="5"
                                          transform="rotate(180,0,0)"
                                        />
                                      </g>
                                    </g>
                                    <polyline
                                      class="bike__seat"
                                      points="14 3,18 3"
                                      stroke-dasharray="5 5"
                                    />
                                    <polyline
                                      class="bike__body"
                                      points="16 3,24 19,9.5 19,18 8,34 7,24 19"
                                      stroke-dasharray="79 79"
                                    />
                                    <path
                                      class="bike__handlebars"
                                      d="m30,2h6s1,0,1,1-1,1-1,1"
                                      stroke-dasharray="10 10"
                                    />
                                    <polyline
                                      class="bike__front"
                                      points="32.5 2,38.5 19"
                                      stroke-dasharray="19 19"
                                    />
                                  </g>
                                </svg> */}
                                {/* Coming Soon-- */}
                              </div>
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
