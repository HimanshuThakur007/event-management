import React from 'react'
import PageHelmet from '../../CustomComp/PageHelmet';
import PageHeader from '../../CustomComp/PageHeader';
import InputField from '../../CustomComp/InputField';
import InputSelect from '../../CustomComp/InputSelect';
import SubmitButton from '../../CustomComp/SubmitButton';
import CardComp from '../../CustomComp/CardComp';
import ReactLoader from '../../CustomComp/ReactLoader';

const SiteCreationPage = (props) => {
  const { name, s1,s2,s3,s4} = props.inputValue;
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="sitecreation"
        helmetName="sitecreation"
        helmetContent="Sitecreation Page"
      />
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Site Creation"
          disableTitle="SiteCreation"
        />

        {/* /Page Header */}

        <CardComp cardTitle="Site Creation Form" cardBodyTitle="Information">
          <form onSubmit={props.saveHandler}>
            <div className="row">
              <div className="col-xl-6">
                <InputField
                  type="text"
                  name="name"
                  labelName="Site Name"
                  value={name}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="email"
                  name="s1"
                  labelName="Email"
                  value={s1}
                  onChange={props.handleInputField}
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
                  <label className="col-lg-3 col-form-label">
                    Address
                  </label>
                  <div className="col-lg-9">
                    <textarea
                      type="text"
                      name="s2"
                      value={s2}
                      onChange={props.handleInputField}
                      rows="6"
                      className="form-control"
                      placeholder="Address.."
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
              <InputField
                  type="text"
                  name="s4"
                  labelName="Contact Person"
                  value={s4}
                  onChange={props.handleInputField}
                />
                <InputField
                  type="text"
                  name="s3"
                  labelName="Mobile No."
                  value={s3}
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
}

export default SiteCreationPage;