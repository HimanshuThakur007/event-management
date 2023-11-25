import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {avatar02,avatar16} from "../imagepath"

const Profile =()=> {
    return (
      <div className="page-wrapper">
        <Helmet>
            <title>Profile - CRMS admin Template</title>
            <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="crms-title row bg-white">
            <div className="col  p-0">
              <h3 className="page-title m-0">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="feather-user" />
                </span> Event Management Profile </h3>
            </div>
            <div className="col p-0 text-end">
              <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Event Management Profile</li>
              </ul>
            </div>
          </div>
          {/* Page Header */}
          <div className="page-header pt-3 mb-0">
            <div className="card ">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-view">
                      <div className="profile-img-wrap">
                        <div className="profile-img">
                          <a href="#"><img alt="" src={avatar02} /></a>
                        </div>
                      </div>
                      <div className="profile-basic">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="profile-info-left">
                              <h3 className="user-name m-t-0 mb-0">John Doe</h3>
                              <h6 className="text-muted">UI/UX Design Team</h6>
                              <small className="text-muted">Web Designer</small>
                              <div className="staff-id">Employee ID : FT-0001</div>
                              <div className="small doj text-muted">Date of Join : 1st Jan 2013</div>
                              {/* <div className="staff-msg"><a className="btn btn-custom" href="#">Send Message</a></div> */}
                            </div>
                          </div>
                          <div className="col-md-7">
                            <ul className="personal-info">
                              <li>
                                <div className="title">Phone:</div>
                                <div className="text"><a>9876543210</a></div>
                              </li>
                              <li>
                                <div className="title">Email:</div>
                                <div className="text"><a>johndoe@example.com</a></div>
                              </li>
                              <li>
                                <div className="title">Birthday:</div>
                                <div className="text">24th July</div>
                              </li>
                              <li>
                                <div className="title">Address:</div>
                                <div className="text">1861 Bayonne Ave, Manchester Township, NJ, 08759</div>
                              </li>
                              <li>
                                <div className="title">Gender:</div>
                                <div className="text">Male</div>
                              </li>
                              <li>
                                <div className="title">Reports to:</div>
                                <div className="text">
                                  <div className="avatar-box">
                                    <div className="avatar avatar-xs">
                                      <img src={avatar16} alt="" />
                                    </div>
                                  </div>
                                  <Link to="profile">
                                    Jeffery Lalor
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pro-edit"><a data-bs-target="#profile_info" data-bs-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content p-0">
              {/* Profile Info Tab */}
             
              {/* /Profile Info Tab */}
            </div>
          </div>
          {/* /Page Header */}
        </div>
        {/* /Page Content */}
      </div>
    );
  }
export default Profile;
