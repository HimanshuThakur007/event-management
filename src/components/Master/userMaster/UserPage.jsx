import React from "react";
import * as FiIcons from "react-icons/fi";
import PageHeader from "../../CustomComp/PageHeader";
import PageHelmet from "../../CustomComp/PageHelmet";
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";
import ReactLoader from "../../CustomComp/ReactLoader";
import DateTimeInput from "../../CustomComp/DateTimeInput";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { NestedCheckbox } from "../../NestedCheckbox/NestedCheckbox";
import { TreeView } from "../../NestedCheckbox/TreeNode";
// import CheckboxTree from './CheckboxTree';

const UserPage = (props) => {
  let iconStyles = { color: "grey" };
  const {
    username,
    password,
    email,
    confirmpassword,
    mobile,
    type,
    address,
    whtsap,
  } = props.inputValue;
  // console.log("pppppp", props.nodes);
  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="User"
          helmetName="description"
          helmetContent="User Page"
        />
        {props.loading ? (
          <ReactLoader
            loaderClass="position-absolute"
            loading={props.loading}
          />
        ) : null}
        <div className="content container-fluid">
          {/* Page Header */}
          <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="User"
            disableTitle="User"
          />

          {/* /Page Header */}

          <CardComp cardTitle="User Form" cardBodyTitle="Information">
            <form onSubmit={props.saveHandler}>
              <div className="row">
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    stars="*"
                    name="username"
                    labelName="Name"
                    value={username}
                    onChange={props.handleInputField}
                    required
                  />
                  <InputField
                    type="email"
                    name="email"
                    labelName="Email"
                    value={email}
                    onChange={props.handleInputField}
                  />

                  <DateTimeInput
                    datelblClass="col-lg-3"
                    dateinpClass="col-lg-9"
                    datelabel="DOB"
                    dateFormat="dd/MM/yyyy"
                    selected={props.dates.dob}
                    onChange={(date) => props.handleDateChange("dob", date)}
                  />

                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="Active Status"
                    selectClass="col-lg-9"
                    name="block"
                    placeholder="Yes/No"
                    value={props.blockOption}
                    onChange={props.blockHandler}
                    options={props.blockList}
                  />

                  <InputField
                    type={props.visibility ? "text" : "password"}
                    name="password"
                    star="*"
                    labelName="Password"
                    value={password}
                    onChange={props.handleInputField}
                    required
                  />

                  {props.visibility === true ? (
                    <span
                      onClick={props.togglePasswordVisibility}
                      className="d-flex justify-content-end"
                    >
                      <i className="eye-icon eye-on-pswd pe-4">
                        <FiIcons.FiEye style={iconStyles} />
                      </i>
                    </span>
                  ) : (
                    <span
                      onClick={props.togglePasswordVisibility}
                      className="d-flex justify-content-end"
                    >
                      <i className="eye-icon eye-on-pswd pe-4">
                        <FiIcons.FiEyeOff style={iconStyles} />
                      </i>
                    </span>
                  )}
                  {/* <div className="form-group row">
                  <label className="col-lg-3 col-form-label ">
                    Add Images
                    <div>
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Max 1 Image Upload *
                      </span>
                    </div>
                  </label>

                  <div className="col-lg-9">
                    <ImagesUploder imageHandler={props.imageHandler} />
                  </div>
                </div> */}
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
                    type="number"
                    stars="*"
                    min="0"
                    name="mobile"
                    labelName="Mobile"
                    value={mobile}
                    onChange={props.handleInputField}
                    required
                  />

                  <InputField
                    type="number"
                    min="0"
                    name="whtsap"
                    labelName="WhatsApp No."
                    value={whtsap}
                    onChange={props.handleInputField}
                  />

                  <InputSelect
                    labelClass="col-lg-3"
                    star="*"
                    selectName="Type"
                    selectClass="col-lg-9"
                    name="typelist"
                    placeholder="Type"
                    value={props.selectedOption}
                    onChange={props.selectHandler}
                    options={props.typelist}
                    required
                  />
                  {props.typeVal != 4 ? (
                    <InputSelect
                      labelClass="col-lg-3"
                      selectName="Department"
                      selectClass="col-lg-9"
                      name="department"
                      placeholder="Department"
                      value={props.department}
                      onChange={props.DepartementHandler}
                      options={props.departmentList}
                    />
                  ) : (
                    <InputSelect
                      labelClass="col-lg-3"
                      selectName="Department"
                      selectClass="col-lg-9"
                      name="multidepartment"
                      placeholder="Multiselect Department"
                      value={props.multiSelectValue}
                      onChange={props.handleMultiSelectChange}
                      options={props.departmentList}
                      isMulti
                      required
                    />
                  )}
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="Site"
                    selectClass="col-lg-9"
                    value={props.siteSelect}
                    onChange={props.selectSiteHandler}
                    name="EType"
                    options={props.siteList}
                  />

                  <InputField
                    type="file"
                    labelName="Upload File"
                    onChange={props.onImageChange}
                  />
                  {props.image && (
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Image</label>
                      <div className="col-lg-9">
                        <img
                          src={props.image}
                          alt="preview image"
                          style={{ width: "37%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* <CardComp
                cardTitle="User Rights"
                cardBodyTitle=""
                crdStyle={{ backgroundColor: "lavender" }}
              > */}
              </div>
              <CardComp cardTitle="User Right" cardBodyTitle="">
                <div className="row">
                  <div className="col-xl-6">
                    {/* <CheckboxTree
                      nodes={props.nodes}
                      checked={props.checked}
                      expanded={props.expanded}
                      onCheck={(checkedData) => {
                        props.setChecked(checkedData);
                      }}
                      onExpand={(expandedData) => {
                        props.setExpanded(expandedData);
                      }}
                    /> */}
                    {props.renderCheckboxTree(props.userRightList)}
                  </div>
                  <div className="col-xl-6">
                    <InputSelect
                      labelClass="col-lg-3"
                      selectName="Reporting Site"
                      selectClass="col-lg-9"
                      value={props.multiSiteList}
                      onChange={props.multiSiteHandler}
                      name="EType"
                      isMulti
                      options={props.siteList}
                    />
                  </div>
                </div>
              </CardComp>

              <SubmitButton parentClass="text-end" btnName="Submit" />
            </form>
          </CardComp>
        </div>
      </div>
    </>
  );
};

export default UserPage;
