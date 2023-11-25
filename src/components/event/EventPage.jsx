import React from "react";
// import { Helmet } from "react-helmet";
import ImagesUploder from "../image_uploder/index";
import { Link } from "react-router-dom";
import DateTimeInput from "../CustomComp/DateTimeInput";
import InputSelect from "../CustomComp/InputSelect";
import ReactLoader from "../CustomComp/ReactLoader";
import ReviewTaskModal from "./ReviewTaskModal";
import InputField from "../CustomComp/InputField";

const EventPage = (props) => {
  const curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substring(0, 10);
  const showTime = curr.getHours() + ":" + curr.getMinutes();
  const { Name, EAdd, Det, ContName, Email, PhNo, ETime } =
    props.inputValue;
  return (
    <div className="page-wrapper">
      {/* <Helmet>
                <title>Form Event - Event Management</title>
                <meta name="description" content="Login page" />
            </Helmet> */}
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="crms-title row bg-white mb-4">
          <div className="col  p-0">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fa fa-object-group" aria-hidden="true" />
              </span>{" "}
              Event Information
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
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Add Information</h4>
              </div>
              <div className="card-body">
                {/* <h4 className="card-title">Personal Information</h4> */}

                <form action="#" onSubmit={props.saveHandler}>
                  <div className="row">
                    {/* //First Col */}
                    <div className="col-xl-6">
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Event Title <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            name="Name"
                            value={Name}
                            onChange={props.handleInputField}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Event Details
                        </label>
                        <div className="col-lg-9">
                          <textarea
                            type="text"
                            name="Det"
                            value={Det}
                            onChange={props.handleInputField}
                            rows="6"
                            className="form-control"
                            placeholder="Description"
                          
                          />
                        </div>
                      </div>

                      

                      <DateTimeInput
                        datelblClass="col-lg-3"
                        dateinpClass="col-lg-9"
                        datelabel="Event Date"
                        datestar="*"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.date1}
                        onChange={(date) =>
                          props.handleDateChange("date1", date)
                        }
                      />
                      {/* </div> */}
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Time <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="Time"
                            name="ETime"
                            value={ETime}
                            onChange={props.handleInputField}
                            className="form-control"
                            defaultValue={showTime}
                            required
                          />
                        </div>
                      </div>
                      <InputSelect
                        labelClass="col-lg-3"
                        selectName="Site"
                        
                        selectClass="col-lg-9"
                        value={props.selectedValues.select3}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select3",
                            props.setSelectedValues
                          )
                        }
                        name="EType"
                        options={props.siteList}
                        
                      />
                     


                      {/* ---------------image-uploader-------------- */}
                      <InputField type='file' labelName='Upload Pic' onChange={props.handleImageUpload}/>
                      <img src={props.base64Image} alt="img" style={{width:"23vh",marginTop:"3vh"}}/>
                      
                    </div>

                    {/* //Secound Col */}
                    <div className="col-xl-6">
                    <InputSelect
                        labelClass="col-lg-3"
                        selectName="Assign To"
                        star="*"
                        selectClass="col-lg-9"
                        value={props.multiSelectValue}
                        onChange={props.handleMultiSelectChange}
                        options={props.assignToList}
                        isMulti
                        required
                      />
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Venue <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            name="EAdd"
                            value={EAdd}
                            onChange={props.handleInputField}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <InputSelect
                        labelClass="col-lg-3"
                       
                        selectName="Customer Name"
                        selectClass="col-lg-9"
                        value={props.selectedValues.select4}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select4",
                            props.setSelectedValues
                          )
                        }
                        name="EType"
                        options={props.customerList}
                        
                      />

                      {/* <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Customer Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            name="ContName"
                            value={ContName}
                            onChange={props.handleInputField}
                            className="form-control"
                          />
                        </div>
                      </div> */}

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Email
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            name="Email"
                            value={Email}
                            onChange={props.handleInputField}
                            className="form-control"
                            placeholder="example@example.com"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Mobile Number  <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            name="PhNo"
                            value={PhNo}
                            onChange={props.handleInputField}
                            placeholder="+91 1234567890"
                            required
                          />
                        </div>
                      </div>
                     

                      {/* <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Designation
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            name="Designation"
                            value={Designation}
                            onChange={props.handleInputField}
                            className="form-control"
                          />
                        </div>
                      </div> */}
                      <InputSelect
                        labelClass="col-lg-3"
                        selectName="Event Type"
                        selectClass="col-lg-9"
                        name="EType"
                        //   placeholder="Yes/No"
                        value={props.selectedValues.select1}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select1",
                            props.setSelectedValues
                          )
                        }
                        options={props.eventList}
                      />

                      {/* <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Event Type <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Select the services"
                            required
                          />
                        </div>
                      </div> */}

                      {/* <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Event Status <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Select the status"
                            required
                          />
                        </div>
                      </div> */}

                      <InputSelect
                        labelClass="col-lg-3"
                        selectName="Event Status"
                        selectClass="col-lg-9"
                        name="EStatus"
                        //   placeholder="Yes/No"
                        value={props.selectedValues.select2}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select2",
                            props.setSelectedValues
                          )
                        }
                        options={props.EventStatus}
                      />
                       <a className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" id="add-review" data-bs-toggle="modal" data-bs-target="#add_review">Question Review</a>
                    
                    </div>
                     
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-custom btn-gradient-primary btn-rounded"
                      style={{ Height: "55px" }}
                    >
                      Create Event
                    </button>
                  </div>
                </form>
                <ReviewTaskModal handleMultiQuestionChange={props.handleMultiQuestionChange}
                 multiQueValue={props.multiQueValue} setMultiQueValue={props.setMultiQueValue} reviewData={props.reviewData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
