import React from 'react'

const InputField = (props) => {
  // function handleEnter(event) {
  //   if (event.keyCode === 13) {
  //     const form = event.target.form;
  //     const index = Array.prototype.indexOf.call(form, event.target);
  //     form.elements[index + 1].focus();
  //     event.preventDefault();
  //   }
  // }
  return (
    <>
      <div className="form-group row">
        <label className="col-lg-3 col-form-label">{props.labelName} <span style={{ color: "red" }}>{props.stars}</span></label>
        <div className="col-lg-9">
          <input
            type={props.type}
            name={props.name}
            className="form-control"
            autoComplete="off"
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            // ref={props.ref}
            min={props.min}
            required={props.required}
            disabled={props.disabled}
           
          />
        </div>
      </div>
    </>
  );
}

export default InputField;