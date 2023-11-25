import React from "react";
import GraphicalChart from "./GraphicalPieChart";

const GraphCard = (props) => {
  return (
    <>
    <h5 className="card-title d-flex justify-content-center">{props.mainHead}</h5>
    <p className="card-title d-flex justify-content-center" style={{fontSize:'medium'}}>
        {props.datetitle}
      </p>
      <p className="card-title d-flex justify-content-center">
        {props.cardTitle}
      </p>
      <div className="col-lg-12 d-flex justify-content-between">
        <div className="col-6">
          <div className="col-12 d-flex justify-content-center ">
            <span className="">{props.num1}</span>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <span className="">{props.label1}</span>
          </div>
        </div>
        {/* <div className='col-6 bg-warning '><span className='d-block'><span>5252</span> <span>Total FeedBack</span></span></div> */}
        <div className="col-6">
          <div className="col-12 d-flex justify-content-center">
            <span className="">{props.num2}</span>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <span className="">{props.label2}</span>
          </div>
        </div>
      </div>

      <GraphicalChart
       mainHead={props.mainHead}
        lbl1={props.lbl1}
        lbl2={props.lbl2}
        bg1={props.bg1}
        bg2={props.bg2}
        data1={props.data1}
        data2={props.data2}
      />
      <div className="col-lg-12 d-flex justify-content-between mt-2">
        <div className="col-6">
          <div className="col-12 d-flex justify-content-center ">
            <span className="">{props.num3}</span>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <span className="">{props.label3}</span>
          </div>
        </div>
        {/* <div className='col-6 bg-warning '><span className='d-block'><span>5252</span> <span>Total FeedBack</span></span></div> */}
        <div className="col-6">
          <div className="col-12 d-flex justify-content-center">
            <span className="">{props.num4}</span>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <span className="">{props.label4}</span>
          </div>
        </div>
      </div>
        <div className="col-12 d-flex justify-content-center">
          <span>{props.happyr}</span>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <span>{props.improve}</span>
        </div>
    </>
  );
};

export default GraphCard;
