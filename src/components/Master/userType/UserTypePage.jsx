import React from 'react';
import PageHeader from '../../CustomComp/PageHeader';
import PageHelmet from '../../CustomComp/PageHelmet';
import CardComp from '../../CustomComp/CardComp';
import InputField from '../../CustomComp/InputField';
import ReactLoader from '../../CustomComp/ReactLoader';
import SubmitButton from '../../CustomComp/SubmitButton';

const UserTypePage = (props) => {
  const {name} = props.inputValue;
  return (
    <>
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="User"
        helmetName="description"
        helmetContent="User Type Page"
      />
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="User Type"
          disableTitle="User Type"
        />

        {/* /Page Header */}

        <CardComp
          cardTitle="User Type Form"
          cardBodyTitle="Information"
        >
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
  )
}

export default UserTypePage;