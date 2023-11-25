import React from 'react'

const InputCheckBox = (props) => {
  return (
    <>
      {/* <div className="form-group row"> */}
        {/* <div className="selectBox-cont"> */}
        
        <label className="custom_check ml-2">
          <input
            type="checkbox"
            name={props.inpName}
            onChange={props.onChange}
            checked={props.checked}
            className='form-check-input'
          />
          <span className="checkmark" />{props.checkName}
        </label>
      {/* </div> */}
    </>
  );
}

export default InputCheckBox