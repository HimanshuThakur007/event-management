import React from "react";
import { Rate } from 'antd';
import StarRatings from "react-star-ratings";
export const MyRatingComponent = ({ decimalValue }) => {
    // Assuming decimalValue is the decimal rating received (e.g., 1.2, 1.5, etc.)
    const antdRateValue = decimalValue * 2; // Convert to fit half-star increments
  
    return (
      <div>
        <p>Rate:</p>
        <Rate allowHalf defaultValue={antdRateValue} />
      </div>
    );
  };

const ReviewModal = (props) => {
    const handleClose = (code) => {
        $("#add_task").modal("hide");
     
      };
  return (
    // <div className="page-wrapper">
    <div
      className="modal right fade"
      id="add_task"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <button
          type="button"
          className="close md-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-center">All Review</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {props.reviewList.map((obj,index) => {
                return (
                  <>
                    <div className="event_ccontent">
                      <span>
                        {/* <Rate key={index} allowHalf disabled defaultValue={parseFloat(obj.avgRating)} /> */}
                        {/* <StarRatings
                        key={index}
                          rating={parseFloat(obj.avgRating)}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="25px"
                          starSpacing="1px"
                          starHoverColor="gold"
                          starEmptyColor="gray"
                          starFraction={true}
                        /> */}
                      </span>
                      <div className="event_about event_details mb-2 p-0">
                        <h4>
                          Review By :-{" "}
                          <span style={{ color: "blue" }}>{obj.name}</span>
                        </h4>
                        <ul className="">
                          <li>
                            <span> Description : </span>
                            {obj.desc}
                          </li>
                          <li>
                            <span>Mobile No. : </span>
                            {obj.mobNo}
                          </li>

                          <li>
                            <span>Remark : </span>
                            {obj.remark}
                          </li>

                          <li>
                            <span>Rating : </span>
                            <StarRatings
                        key={index}
                          rating={parseFloat(obj.avgRating)}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="25px"
                          starSpacing="1px"
                          starHoverColor="gold"
                          starEmptyColor="gray"
                          starFraction={true}
                        />
                            </li>
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })}
               
               {/* <MyRatingComponent decimalValue={1.2}/> */}
              <div className="text-center py-3">
                      
                      <button type="button" className="btn btn-secondary btn-rounded" onClick={handleClose}>Cancel</button>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ReviewModal;
