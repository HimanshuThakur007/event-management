import React from 'react'
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import EventCards from '../cards';

const EventDetails = () => {
    let about = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, cum, a eligendi commodi eius quas velit quisquam repudiandae quibusdam officiis, harum itaque saepe mollitia. Ipsa maxime perferendis tempora necessitatibus porro."
    let obj = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, cum, a eligendi commodi eius quas velit quisquam repudiandae quibusdam officiis, harum itaque saepe mollitia. Ipsa maxime perferendis tempora necessitatibus porro."
    return (
            <div className="page-wrapper">
            <Helmet>
                <title>Event - Event&Management</title>
                <meta name="description" content="Event Page" />
            </Helmet>
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="crms-title row bg-white mb-3">
                    <div className="col  p-0">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="fa fa-object-group" aria-hidden="true" />
                            </span> Events Details </h3>
                    </div>
                    <div className="col p-0 text-end">
                        <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Event</li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <EventCards name='Himanshu' about={about} obj={obj} />
                        <EventCards name='Himanshu' />
                    </div>
                </div>
                
            </div>
        </div>
  )
};

export default EventDetails
