import React from "react";
import InputField, { InputTextArea } from "../CustomComp/InputField";
import { Emailconfig } from "./Emailconfig";
import ReactLoader from "../CustomComp/ReactLoader";
import InputToggel from "../CustomComp/InputToggel";
import PageHelmet from "../CustomComp/PageHelmet";
import PageHeader from "../CustomComp/PageHeader";
import CardComp from "../CustomComp/CardComp";
import SubmitButton from "../CustomComp/SubmitButton";

const EmailConfigPage = () => {
  const {
    handleInputField,
    handleEmailSave,
    handleValueChange,
    loading,
    inputValue,
    values,
  } = Emailconfig();
  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="Email Config"
          helmetName="description"
          helmetContent="Email Config"
        />
        {loading ? (
          <ReactLoader loaderClass="position-absolute" loading={loading} />
        ) : null}
        <div className="content container-fluid">
          <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="Email Configuration"
            disableTitle="Email Configuration"
          />
          <CardComp
            cardTitle="Email Configuration"
            cardBodyTitle="Configuration"
          >
            <form onSubmit={handleEmailSave}>
              <div className="row">
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    name="SenderID"
                    star="*"
                    labelName="Sender ID"
                    value={inputValue.SenderID}
                    onChange={handleInputField}
                    required
                  />
                </div>
                <div className="col-xl-6">
                  <InputField
                    type="password"
                    name="PWD"
                    star="*"
                    labelName="Password"
                    value={inputValue.PWD}
                    onChange={handleInputField}
                    required
                  />
                </div>
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    name="SMTPServer"
                    star="*"
                    labelName="SMTP Server"
                    value={inputValue.SMTPServer}
                    onChange={handleInputField}
                    required
                  />
                </div>
                <div className="col-xl-6">
                  <InputField
                    type="number"
                    name="SMTPPort"
                    star="*"
                    labelName="SMTP Port"
                    value={inputValue.SMTPPort}
                    onChange={handleInputField}
                    required
                  />
                </div>

                <div className="col-xl-12">
                  <InputToggel
                    labelName="SSL"
                    dangerTag="*"
                    id="ssl"
                    name="EmailSSL"
                    initialValue={values.ssl}
                    onValueChange={handleValueChange}
                  />
                </div>
                <div className="col-xl-12">
                  <InputTextArea
                    type="text"
                    name="EMailB"
                    dangerTag="*"
                    label="Email Footer"
                    value={inputValue.EMailB}
                    rows={4}
                    onChange={handleInputField}
                    required
                  />
                </div>
              </div>
              <SubmitButton parentClass="text-end" btnName="Save" />
            </form>
          </CardComp>
        </div>
      </div>
    </>
  );
};

export default EmailConfigPage;
