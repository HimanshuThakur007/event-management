import React from "react";
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";
import ReactLoader from "../../CustomComp/ReactLoader";
import DateTimeInput from "../../CustomComp/DateTimeInput";

const ContactMasterPage = (props) => {
  const { name, mobile, mobile2, email, org, rAdd, oAdd, pincode, location } =
    props.inputValue;
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="ContactMaster - S&S Enterprises"
        helmetName="description"
        helmetContent="ContactMaster Page"
      />

      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}

      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Contact Master"
          disableTitle="Contact Master"
        />
        {/* /Page Header */}

        <CardComp
          cardTitle="Contact Master Form"
          cardBodyTitle="Information"
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
                  type="number"
                  name="mobile"
                  labelName="Mobile No."
                  placeholder="Mobile No"
                  value={mobile.slice(0, 10)}
                  min="0"
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="number"
                  min="0"
                  name="mobile2"
                  labelName="Alternate No"
                  placeholder="Alternate Mobile No."
                  value={mobile2.slice(0, 10)}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="email"
                  name="email"
                  labelName="Email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={props.handleInputField}
                  required
                />

                <InputSelect
                  labelClass="col-lg-3"
                  selectName="Type"
                  selectClass="col-lg-9"
                  name="type"
                  placeholder="Type"
                  value={props.selectType}
                  onChange={props.typeSelectHandler}
                  options={props.typeList}
                />

                <InputSelect
                  labelClass="col-lg-3"
                  selectName="Business Nature"
                  selectClass="col-lg-9"
                  name="businness"
                  placeholder="Business Nature"
                  // value={props.selectBusinessNature}
                  // onChange={props.businessNatureHandler}
                  // options={props.businessList}
                />

                <DateTimeInput
                  datelblClass="col-lg-3"
                  dateinpClass="col-lg-9"
                  datelabel="DOB"
                  dateFormat="dd/MM/yyyy"
                  selected={props.dates.dob}
                  onChange={(date) => props.handleDateChange("dob", date)}
                />
              </div>
              {/* --------other side Input------ */}
              <div className="col-xl-6">
                <InputField
                  type="text"
                  name="org"
                  labelName="Organisation"
                  value={org}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="text"
                  name="rAdd"
                  labelName="Res. Address"
                  placeholder="Residential Address"
                  value={rAdd}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="text"
                  name="oAdd"
                  labelName="Office Address"
                  value={oAdd}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="number"
                  name="pincode"
                  labelName="Pincode"
                  value={pincode}
                  onChange={props.handleInputField}
                  required
                />
                {/* <InputField
                  type="text"
                  name="location"
                  labelName="Location"
                  value={location}
                  onChange={props.handleInputField}
                  required
                /> */}
                 <InputSelect
                  labelClass="col-lg-3"
                  selectName="Location"
                  selectClass="col-lg-9"
                  name="location"
                  placeholder="Select Location"
                  // value={props.location}
                  // onChange={props.locationHandler}
                  // options={props.locationList}
                />

                <DateTimeInput
                  datelblClass="col-lg-3"
                  dateinpClass="col-lg-9"
                  datelabel="DOA"
                  dateFormat="dd/MM/yyyy"
                  selected={props.dates.doa}
                  onChange={(date) => props.handleDateChange("doa", date)}
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

export default ContactMasterPage;
