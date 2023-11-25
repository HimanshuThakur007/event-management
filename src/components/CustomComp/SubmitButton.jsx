import React from "react";

const SubmitButton = (props) => {
  return (
    <>
     <div className={props.parentClass}>
        <button type="submit" className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" onClick={props.onClick}>
          {props.btnName}
        </button>
      </div>
    </>
  );
};

export default SubmitButton;

