import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateTimeInput = (props) => {
    // const [startDate, setStartDate] = useState(new Date());
    // convert(setStartDate)
    // console.log('startDate', startDate)
  return (
    <div className="form-group row">
      <label className={`${props.datelblClass} col-form-label`}>{props.datelabel} <span style={{ color: "red" }}>{props.datestar}</span></label>
      <div className={`${props.dateinpClass}`}>
      <div className="cal-icon" style={{ width: "100%" }}>
        <DatePicker
        name="name"
          className="form-control"
          selected={props.selected}
          onChange={props.onChange}
          // timeInputLabel="Time"
          timeInputLabel={props.timeInputLabel}
        //  dateFormat="dd/MM/yyyy h:mm aa"
         dateFormat={props.dateFormat}
         autoComplete="off"
          
        //   selected={startDate}
        //   onChange={(date) => setStartDate(date)}
        //   timeInputLabel="Time:"
          showTimeInput
          
        />
        </div>
      </div>
    </div>
  );
};

export default DateTimeInput;

 export const convert =(str)=> {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var timeString = date.getHours() + ':' + date.getMinutes() + ':00';

    return [date.getFullYear(), mnth, day].join("-") + " " +timeString;
};


// var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

export const convertDate =(str)=> {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
   
    return [date.getFullYear(), mnth, day].join("-");
  }
  
export const convertDate2 =(str)=> {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
   
    return [day,  mnth , date.getFullYear()].join("-");
  }

 
