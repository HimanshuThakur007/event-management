import React from 'react'
import { mahadev } from '../imagepath';
const EventCards = (props) => {
  return (
    <div className="card flex-fill">
        <div className="card-header flex-row" style={{display:"-webkit-flex", alignItems:"center" , gap:"10px"}} >
            <span className='avatar'>
                <img src={mahadev} alt="Not found" />
            </span>
            <h5 className="card-title">{props.name}</h5>
        </div>

        <div className="card-body">
          <nav className='mb-3'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" tabindex="-1">Review</button>
            </div>
          </nav>

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
      </div>
  )
}

export default EventCards;