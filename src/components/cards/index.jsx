import React from "react";
import { mahadev } from "../imagepath";
const EventCards = (props) => {
  return (
    <>
      <div className="card">
       
        <section className="comp-section" id="comp_tabs">
          <div className="card-body">
            <h4 className="card-title">Basic tabs</h4>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="#basictab1"
                  data-bs-toggle="tab"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#basictab2" data-bs-toggle="tab">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#basictab3" data-bs-toggle="tab">
                  Messages
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="basictab1">
              <div className='event_ccontent'>
              <div className='event_img mb-2'>
              <img src={mahadev} alt="image not found" />
            </div>
            <div className='event_about mb-2'>
              <h4>About The Event</h4>
              <p className='mb-5'>{props.about}</p>
            </div>

            <div className='event_about'>
              <h4>Event’s Objectives</h4>
              <p className='mb-5'>{props.obj}</p>
            </div>

            <div className="event_about event_details mb-2 p-0">
              <h4>Event Details</h4>
              <ul className=''>
                  <li>
                    <span> Date : </span>
                    January 1, 2024 - January 1, 2025							
                  </li>
                  <li>
                    <span>Time : </span>
                    3:00 pm - 6:00 pm (UTC)
                  </li>
                  <li>
                    <span>Reg. Deadline : </span>
                    June 1, 2023							
                  </li>
                  <li>
                    <span>Venue : </span>
                    Vivek									
                  </li>
              </ul>
            </div>
            </div>
              </div>
              <div className="tab-pane" id="basictab2">
                Tab content 2
              </div>
              <div className="tab-pane" id="basictab3">
                Tab content 3
              </div>
              
            </div>

           
          </div>
        </section>
      </div>
    </>
  );
};

export default EventCards;
