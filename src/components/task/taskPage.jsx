import React from 'react'
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "../antdstyle.css"
import { Link } from "react-router-dom";
import { itemRender,onShowSizeChange } from "../paginationfunction"
import "../antdstyle.css"
import TaskDetailModel from "./TaskDetailModel";
import SystemUserModel from "./SystemUserModel";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiTask } from "react-icons/bi";
import DateTimeInput from '../CustomComp/DateTimeInput';
import InputSelect from '../CustomComp/InputSelect';
import ReactLoader from '../CustomComp/ReactLoader';
import InputSearch from '../CustomComp/InputSearch';

const TaskPage = (props) => {
  const [searchText, setSearchText] = React.useState("");
    const Priority=[
        {
        value:1,label:"Daily"
    },
        {
        value:2,label:"Medium"
    },
        {
        value:3,label:"High"
    },
]
    const Status=[
        {
        value:1,label:"Not Started"
    },
        {
        value:2,label:"Active"
    },
        {
        value:3,label:"Closed"
    },
]
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
   
  
        const columns = [     
          {
            title: "Template Name",
            dataIndex: "name",
            filteredValue: [searchText],
            onFilter: (value, record) => {
              return String(record.name).toLowerCase().includes(value.toLowerCase())||
              String(record.purposeNme).toLowerCase().includes(value.toLowerCase())||
              String(record.customerName).toLowerCase().includes(value.toLowerCase());
            },
            render: (text, record) => (
              <span className='' style={{color:'#800080'}}>{text}
                 </span>
              ),
            sorter: (a, b) => a.name.length - b.name.length,
          },
          // {
          //   title: "Percent Complete Indicator",
          //   dataIndex: "width",
          //   render: (text, record) => (
          //     <div className="progress">
          //         <div className={record.className1} role="progressbar"
          //          style={{width:{text}}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          //     </div>
          //     ),
          //   sorter: (a, b) => a.user.length - b.user.length,
          // },
          {
            title: "Purpose",
            dataIndex: "purposeNme",
            render: (text, record) => (
              <span className='text-primary'>{text}
              {/* <a href="#" data-bs-toggle="modal" data-bs-target="#system-user">{text}</a> */}
              </span>
              ),
            sorter: (a, b) => a.purposeNme.length - b.purposeNme.length,
          },
          {
            title: "Due Date",
            dataIndex: "expdate",
            render: (text, record) => (
              <span className='text-danger'>{text}</span>
              ),
            sorter: (a, b) => a.expdate.length - b.expdate.length,
          },
          {
            title: "Customer",
            dataIndex: "customerName",
            render: (text, record) => (
              <span className="badge" style={{ background: getRandomColor() }}>{text}</span>
              ),
            sorter: (a, b) => a.customerName.length - b.customerName.length,
          },
          {
            title: "Status",
            dataIndex: "statusName",
            render: (text, record) => (
              <label style={{color:' #A52A2A'}}>{text}</label>
              ),
            sorter: (a, b) => a.statusName.length - b.statusName.length,
          },
          {
            title: "Site",
            dataIndex: "siteName",
            render: (text, record) => (
              <label className={record.className}>{text}</label>
              ),
            sorter: (a, b) => a.siteName.length - b.siteName.length,
          },
          
          {
            title: "",
            dataIndex: "star",
            render: (text, record) => (
              <i className="fa fa-star" aria-hidden="true" />
            ),
            sorter: (a, b) => a.star.length - b.star.length,
          },
    
          {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
              <div className="dropdown dropdown-action">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" onClick={() => props.onRowClick(record)} >Edit</a>
                <a className="dropdown-item" href="#">Delete</a>
                </div>
                </div>
              ),
            // sorter: (a, b) => a.action.length - b.action.length,
          },
        ];  
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
          getCheckboxProps: record => ({
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
            className: "checkbox-red"
          })
        };

        const {Name ,Tmptime ,Mobile, Email, Desc, UserName,ExpTime}=props.inputValue
  return (
    <>
     <div className="page-wrapper">
        <Helmet>
          <title>Daily Template- Event&Management</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
          <div className="content container-fluid">
            <div className="crms-title row bg-white">
              <div className="col  p-0">
                <h3 className="page-title m-0">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i>  <BiTask/></i>
                  </span>{" "}
                  Daily Template{" "}
                </h3>
              </div>
              <div className="col p-0 text-end">
                <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Daily Template</li>
                </ul>
              </div>
            </div>
            <div className="page-header pt-3 mb-0 ">
              <div className="row">
                <div className="col text-end">
                  <ul className="list-inline-item pl-0">
                    <li className="list-inline-item">
                      <button className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" id="add-task" data-bs-toggle="modal" data-bs-target="#add_task" onClick={props.clearHandler}>New Template</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card mb-0">
                  <div className="card-body">
                  <InputSearch search1={setSearchText} search2={setSearchText}/>
                    <div className="table-responsive"> 
                      <Table
                        // rowSelection={rowSelection}
                        // className="table"
                        style={{ overflowX: "auto" }}
                        pagination= { {total : props.templateList.length,
                          showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                        columns={columns}
                        dataSource={props.templateList}
                        rowKey={(record) => record.code}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*modal section starts here*/}
        <div className="modal fade" id="add-new-list">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Add New List View</h4>
                <button type="button" className="close" data-bs-dismiss="modal">×</button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <form className="forms-sample">
                  <div className="form-group row">
                    <label htmlFor="view-name" className="col-sm-4 col-form-label">New View Name</label>
                    <div className="col-sm-8">
                      <input type="text" className="form-control" id="view-name" placeholder="New View Name" />
                    </div>
                  </div>
                  <div className="form-group row pt-4">
                    <label className="col-sm-4 col-form-label">Sharing Settings</label>
                    <div className="col-sm-8">
                      <div className="form-group">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue /> Just For Me <i className="input-helper" /></label>
                        </div><br />
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" defaultValue="option2" defaultChecked /> Share Filter with Everyone <i className="input-helper" /></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal---in use */}
        <div className="modal right fade" id="add_task" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <button type="button" className="close md-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center">Template</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <h4>Template Details</h4>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">Template Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="Name" id="task-name" placeholder="Task Name" onChange={props.handleInputField} value={Name}/>
                      </div>
                      <div className="col-sm-6">
                      <InputSelect
                        star="*"
                        labelClass=""
                        selectName="Assigned To"
                        selectClass="col-lg-12"
                        name="EType"
                        //   placeholder="Yes/No"
                        value={props.multiSelectValue}
                        onChange={props.handleMultiSelectChange}
                        options={props.assignToList}
                        isMulti
                       
                        required
                      />
                        {/* <label className="col-form-label">Assigned To</label>
                        <select className="form-control">
                          <option>Me</option>
                        </select> */}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <InputSelect
                        labelClass=""
                        selectName="Purpose"
                        selectClass="col-lg-12"
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
                        options={props.purposeList}
                      />
                      </div>
                      <div className="col-sm-6">
                          {/* <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="Exp. Date"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.date2}
                        onChange={(date) =>
                          props.handleDateChange("date2", date)
                        }/> */}
                        {/* </div> */}
                      </div>
                    </div>
                    <h4>Additional Information</h4>
                    <div className="form-group row">
                      <div className="col-sm-6">
                         <InputSelect
                         labelClass=""
                         selectName="Site"
                         selectClass="col-lg-12"
                         name="EType"
                         //   placeholder="Yes/No"
                         value={props.multiSitetValue}
                         onChange={props.handleMultiSiteChange}
                         options={props.siteList}
                         isMulti
                        //  star="*"
                        // labelClass=""
                        // selectName="Site"
                        // selectClass="col-lg-12"
                        // name="site"
                        // //   placeholder="Yes/No"
                        // value={props.selectedValues.select4}
                        // onChange={(selectedOption) =>
                        //   props.handleSelectChange(
                        //     selectedOption,
                        //     "select4",
                        //     props.setSelectedValues
                        //   )
                        // }
                        // options={props.siteList}
                        // required
                      />
                      </div>
                      <div className="col-sm-6">
                        {/* {console.log(props.customerList,'.........')} */}
                      <InputSelect
                        labelClass=""
                        selectName="Customer"
                        selectClass="col-lg-12"
                        name="customer"
                        //   placeholder="Yes/No"
                        value={props.selectedValues.select5}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select5",
                            props.setSelectedValues
                          )
                        }
                        options={props.customerList}
                      />
                     
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="Start Date"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.date1}
                        onChange={(date) =>
                          props.handleDateChange("date1", date)
                        }/>
                      </div>
                      <div className="col-sm-6">
                      <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="Exp. Date"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.date2}
                        onChange={(date) =>
                          props.handleDateChange("date2", date)
                        }/>
                        
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-6">
                       <label className="col-form-label">Time From<span className="text-danger">*</span></label>
                      
                        <input
                            type="Time"
                            name="Tmptime"
                            value={Tmptime}
                            onChange={props.handleInputField}
                            className="form-control"
                            required
                          />
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">To Time<span className="text-danger">*</span></label>
                      
                      <input
                          type="Time"
                          name="ExpTime"
                          value={ExpTime}
                          onChange={props.handleInputField}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">Mobile</label>
                        <input className="form-control" type="text" name="Mobile" value={Mobile} onChange={props.handleInputField} placeholder="mobile no" />
                      </div>
                      <div className="col-sm-6">
                        <label className="col-form-label">Email Id</label>
                        <input className="form-control" type="email" name="Email" value={Email} onChange={props.handleInputField} placeholder="email" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                         <InputSelect
                        labelClass=""
                        selectName="Priority"
                        selectClass="col-lg-12"
                        name="EType"
                        //   placeholder="Yes/No"
                        value={props.selectedValues.select2}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select2",
                            props.setSelectedValues
                          )
                        }
                        options={Priority}
                      
                      />
                      </div>
                      <div className="col-sm-6">
                         <InputSelect
                        labelClass=""
                        selectName="Status"
                        selectClass="col-lg-12"
                        name="EType"
                        //   placeholder="Yes/No"
                        value={props.selectedValues.select3}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select3",
                            props.setSelectedValues
                          )
                        }
                        options={Status}
                        
                      />
                      </div>
                    </div>
                    
                    <div className="form-group row">
                      <div className="col-sm-6">
                         <label className="col-form-label">Upload Pic</label>
                         <input className='form-control' type='file' onChange={props.handleImageUpload}/>
                         <img src={props.base64Image} alt="img" style={{width:"23vh",marginTop:"3vh"}}/>;
                        </div>
                      <div className="col-sm-6">
                        </div>
                        </div>
                    <h4>Review Questions</h4>
                    <div className="form-group row">
                      <div className="col-sm-12">
                    <InputSelect
                        labelClass=""
                        selectName="Select Questions"
                        selectClass="col-lg-12"
                        name="EType"
                        //   placeholder="Yes/No"
                        value={props.multiQueValue}
                        onChange={props.handleMultiQuestionChange}
                        options={props.reviewData}
                        isMulti
                       
                        required
                      />
             {props.multiQueValue.map((item,index)=>{
                return (
                    <div className="col-12 col-md-6 col-lg-12 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <h5 className="card-title mb-0 text-danger">Review Questions : {index+1}</h5>
                                </div>
                                <ul className="list-group list-group-flush d-flex">
                                    <li className="list-group-item"> {item.label}</li>
                                </ul>
                            </div>
                        </div>
                );
             })}
             </div>
             </div>
                    <h4>Description Information</h4>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <label className="col-form-label">Description </label>
                        <textarea className="form-control" rows={3} id="description" name='Desc' value={Desc} onChange={props.handleInputField} placeholder="Description" defaultValue={""} />
                      </div>
                    </div>
                    <div className="text-center py-3">
                      <button type="button" className="border-0 btn btn-primary btn-gradient-primary btn-rounded" onClick={props.saveHandler}>Save</button>&nbsp;&nbsp;
                      <button type="button" className="btn btn-secondary btn-rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>{/* modal-content */}
        </div>{/* modal-dialog */}
      </div>
        <TaskDetailModel />
        <SystemUserModel />
        </div>
      
    </>
  )
}

export default TaskPage