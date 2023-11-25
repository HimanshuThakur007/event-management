import React, { useState } from "react";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import InputField from "../../CustomComp/InputField";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";
import ReactLoader from "../../CustomComp/ReactLoader";

const DepartmentPage = (props) => {
  const { name, address, email, compcode, mobile, segment } = props.inputValue;
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="Department - S&S Enterprises"
        helmetName="Department"
        helmetContent="Department Page"
      />
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Department"
          disableTitle="Department"
        />

        {/* /Page Header */}

        <CardComp
          cardTitle="Department Form"
          cardBodyTitle="Department Information"
        >
          <form onSubmit={props.saveHandler}>
            <div className="row">
              <div className="col-xl-6">
                <InputField
                  type="text"
                  name="name"
                  labelName="Name"
                  value={name}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="email"
                  name="email"
                  labelName="Email"
                  value={email}
                  onChange={props.handleInputField}
                  required
                />
                {/* <InputField
                  type="text"
                  name="address"
                  labelName="Address"
                  value={address}
                  onChange={props.handleInputField}
                  required
                /> */}
                 <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Address</label>
                  <div className="col-lg-9">
                    <textarea
                      type="text"
                      name="address"
                      rows="6"
                      className="form-control"
                      placeholder="Address.."
                      value={address}
                      onChange={props.handleInputField}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <InputField
                  type="text"
                  name="mobile"
                  labelName="Mobile No."
                  value={mobile.slice(0, 10)}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="text"
                  name="compcode"
                  labelName="Company Code"
                  value={compcode}
                  onChange={props.handleInputField}
                  required
                />
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Submit" />
          </form>
        </CardComp>
      </div>
    </div>
  );
};

export default DepartmentPage;
