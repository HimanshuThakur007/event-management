import React from 'react'
import { Link } from "react-router-dom";

const PageHeader = (props) => {
  return (
    <>
     <div className="crms-title row bg-white mb-4">
        <div className="col  p-0">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className={props.iclassName} aria-hidden="true" />
            </span>{" "}
            {props.pageTitle}{" "}
          </h3>
        </div>
        <div className="col p-0 text-end">
          <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">{props.disableTitle}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default PageHeader;