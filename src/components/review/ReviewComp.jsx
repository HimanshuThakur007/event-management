import React from 'react';
import { Link } from "react-router-dom";

const ReviewComp = () => {
  return (
    <div className="page-header pt-3 mb-4">
    <div className="row">
      <div className="col">
        <div className="dropdown">
          <a className="dropdown-toggle recently-viewed" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
            {" "}All Reports{" "}
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/pending_review">
            All Pending Reviews
            </Link>
            <Link className="dropdown-item" to="/reviews">
            Question Wise Review
            </Link>
            <Link className="dropdown-item" to="/cust_review">
              Customer Wise Review
            </Link>
            <Link className="dropdown-item" to="/contact_review">
              Contact Wise Review
            </Link>
            <Link className="dropdown-item" to="/resolvedsms_report">
              Resolved Sms
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ReviewComp