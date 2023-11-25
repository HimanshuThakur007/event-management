import React from "react";
import ReactLoader from "../../CustomComp/ReactLoader"
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";
import { C_logo, C_logo2, Circle1, CircleImg } from '../../../components/imagepath';
import Select from "react-select";
import { Collapse } from 'antd';

const CustomerInformation = (props) => {
  const { Panel } = Collapse;
  const {
    custname,
    archname,
    email,
    mobile,
  
    reference,
    gst,
    archmobile,
    add1,
    add2,
    add3,
    add4,
  } = props.inputValue;
React.useEffect(()=>{console.log('kjdgf', props.selectedOptions)},[])

  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="CustomerInformation"
        helmetName="Customer"
        helmetContent="Customer Page"
      />

      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}

      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Customer"
          disableTitle="Customer"
        />
        {/* /Page Header */}

        <CardComp
          cardTitle="Customer Form"
          cardBodyTitle="Customer Information"
        >
          <form onSubmit={props.saveHandler}>
            <div className="row">
              <div className="col-xl-6">
                <InputField
                  stars='*'
                  type="text"
                  name="custname"
                  labelName="Name"
                  value={custname}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="text"
                  name="email"
                  labelName="Email"
                  onChange={props.handleInputField}
                  value={email}
                />

                {/* <InputSelect
                  labelClass="col-lg-3"
                  selectName="Master Group"
                  selectClass="col-lg-9"
                  name="masterGrp"
                  placeholder="Master Group"
                  value={props.masterGroupSelect}
                  onChange={props.selectHandler}
                  options={props.masterGrpData}
                /> */}
                <InputField
                  type="text"
                  name="gst"
                  labelName="GST No."
                  maxLength='15'
                  minLength='15'
                  onChange={props.handleInputField}
                  value={gst}
                  errClass={gst?.length != 0 && gst?.length > 14 ? "invalid-feedback" : ''}
                  errormsg={gst?.length != 0 && gst?.length < 15 ?`Minimum 15 Characters Required :${gst.length}`:null}
                  
                />
                <InputField
                  type="text"
                  name="reference"
                  labelName="Reference"
                  onChange={props.handleInputField}
                  value={reference}
                />
              
                {/* <SubmitButton parentClass="text-start" btnName="+ Contact Master"/> */}
                
              </div>
              {/* --------other side Input------ */}
              <div className="col-xl-6">
                <InputField
                  type="number"
                  name="mobile"
                  labelName="Mobile No."
                  onChange={props.handleInputField}
                  value={mobile}
                  
                />
                <InputField
                  type="text"
                  name="add1"
                  labelName="Address"
                  onChange={props.handleInputField}
                  value={add1}
                  
                />
                <InputField
                  type="text"
                  name="add2"
                  labelName=""
                  onChange={props.handleInputField}
                  value={add2}
                  
                />
                <InputField
                  type="text"
                  name="add3"
                  labelName=""
                  onChange={props.handleInputField}
                  value={add3}
                  
                />
                <InputField
                  type="text"
                  name="add4"
                  labelName=""
                  onChange={props.handleInputField}
                  value={add4}
                  
                />
               
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Submit" />
          </form>
          {/* <button onClick={props.getBusinessNatureHandler} className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" id="company-details" data-bs-toggle="modal" data-bs-target="#company_details">+ Contact Master</button> */}
        </CardComp>


       
      </div>
    </div>
  );
};

export default CustomerInformation;


