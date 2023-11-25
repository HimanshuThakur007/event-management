import React from 'react'
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {itemRender,onShowSizeChange} from "../paginationfunction"
 import "../antdstyle.css";
 import ReactLoader from '../CustomComp/ReactLoader';
import zIndex from '@material-ui/core/styles/zIndex';
import SubmitButton from '../CustomComp/SubmitButton';
import InputSearch from '../CustomComp/InputSearch';

const ListPage = ({disableHeader,HelmetTitle,subHeader,columns,data,defaultHead,onRow,onClick,loading,onRowClick,routeParams,setSearchText}) => {
  let id =routeParams.id
  return (
    <div className="page-wrapper">
    <Helmet>
          <title>{HelmetTitle}</title>
          <meta name="description" content="Data Tables"/>					
    </Helmet>
    {loading ?<ReactLoader loaderClass="position-absolute" loading={loading}  />: null}
    <div className="content container-fluid">
      {/* Page Header */}
      <div className="crms-title row bg-white mb-4">
           <div className="col  p-0">
           <h3 className="page-title">
               <span className="page-title-icon bg-gradient-primary text-white me-2">
               <i className="fas fa-table" />
               </span>{subHeader}</h3>
           </div>
           <div className="col p-0 text-end">
           <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
               <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
               <li className="breadcrumb-item active">{disableHeader}</li>
           </ul>
           </div>
       </div>
       <div className="page-header pt-3 mb-0 ">
              <div className="row">
                {/* <div className="col">
                  <div className="dropdown">
                    <a className="dropdown-toggle recently-viewed" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Recently Viewed</a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Recently Viewed</a>
                      <a className="dropdown-item" href="#">Items I'm following</a>
                      <a className="dropdown-item" href="#">All Companies</a>
                      <a className="dropdown-item" href="#">Companies added in the last 24 hours</a>
                      <a className="dropdown-item" href="#">Companies added in the last 7 days</a>
                      <a className="dropdown-item" href="#">Companies with no notes in the last month</a>
                      <a className="dropdown-item" href="#">Companies with no notes in the last 7 days</a>
                    </div>
                  </div>
                </div> */}
                <div className="col text-end">
                  <ul className="list-inline-item pl-0">
                    {/* <li className="nav-item dropdown list-inline-item add-lists">
                      <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className="nav-profile-text">
                          <i className="fa fa-th" aria-hidden="true" />
                        </div>
                      </a>
                      <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#add-new-list">Add New List View</a>
                      </div>
                    </li> */}
                    <li className="list-inline-item">
                      {/* <button className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" id="add-task" data-bs-toggle="modal" data-bs-target="#add_company">New Company</button> */}
                      <SubmitButton 
                      btnName={
                      id == 1 ?'Add UserType': 
                      id == 2 ?'Add Department':
                      id == 3 ?"Add Site":
                      id == 4 ?"Add User":
                      id == 5 ? "Add Customer":
                      id == 6 ? "Add Purpose":
                      id == 8 ? "Add Event Type":
                      id == 9 ? "Add Event Status":
                      id == 10 ? "Add Review":
                      id == 11 ? "Add Master Group":
                      "Add"
                    } 
                      onClick={onRowClick}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-0">
          <div className="card-header">
               <h4 className="card-title mb-0">{defaultHead}</h4>
               {/* <p className="card-text py-3">
               This is the most basic example of the datatables with zero configuration. Use the <code>.datatable</code> class to initialize datatables.
               </p> */}
           </div>
            <div className="card-body">
              <InputSearch search1={setSearchText} search2={setSearchText}/>
              <div className="table-responsive">
              <Table
               
                    pagination= { {total : data.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                        className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    bordered
                    dataSource={data}
                    rowKey={record => record.code}
                    onRow={onRow}
                    onClick={onClick}
                   //  onChange={this.handleTableChange}
                />                         
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>			
  </div>
  )
}

export default ListPage