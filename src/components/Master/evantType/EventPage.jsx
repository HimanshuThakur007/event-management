import React from 'react';
import PageHeader from '../../CustomComp/PageHeader';
import PageHelmet from '../../CustomComp/PageHelmet';
import InputField from '../../CustomComp/InputField';
import ReactLoader from '../../CustomComp/ReactLoader';
import CardComp from '../../CustomComp/CardComp';
import SubmitButton from '../../CustomComp/SubmitButton';

const EventPage = (props) => {
    const {name} = props.inputValue;
  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="EventType"
          helmetName="description"
          helmetContent="Purpose Page"
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
            pageTitle="Event Type"
            disableTitle="Event Type"
          />
          {/* /Page Header */}

          <CardComp cardTitle="Event Type" cardBodyTitle="">
            <form onSubmit={props.saveHandler}>
              <div className="row">
                <div className="col-xl-8">
                  <InputField
                    type="text"
                    name="name"
                    labelName="Name"
                    value={name}
                    onChange={props.handleInputField}
                    required
                  />
                </div>
                {/* --------other side Input------ */}
                <div className="col-xl-4">
                  <SubmitButton
                    parentClass="text-lg-start text-center"
                    btnName="Submit"
                  />
                </div>
              </div>
            </form>
          </CardComp>
        </div>
      </div>
    </>
  );
}

export default EventPage