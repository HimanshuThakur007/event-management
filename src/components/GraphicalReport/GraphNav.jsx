import React from 'react';
import { Link } from "react-router-dom";

const GraphNav = () => {
  return (
    <div className="page-header">
    <div className="row">
      <div className="col">
        <div className="dropdown">
          <a className="dropdown-toggle recently-viewed" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
            {" "}All Reports{" "}
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/graphical_report">
             Template Report
            </Link>
            <Link className="dropdown-item" to="/graphical_event_report">
            Event Report
            </Link>
            <Link className="dropdown-item" to="/comparison_Page">
            Comparison Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default GraphNav