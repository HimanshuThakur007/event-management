import React from 'react'
import PageHelmet from '../../CustomComp/PageHelmet'
import ReactLoader from '../../CustomComp/ReactLoader'
import PageHeader from '../../CustomComp/PageHeader'
import CardComp from '../../CustomComp/CardComp'
import SubmitButton from '../../CustomComp/SubmitButton'
import InputSelect from '../../CustomComp/InputSelect'

const ReviewPage = (props) => {
   
const {name} = props.inputValue
  return (
    <div className="page-wrapper">
    <PageHelmet
      helmetTitle="reviewQuestion"
      helmetName="reviewQuestion"
      helmetContent="reviewQuestion Page"
    />
    {props.loading ? (
      <ReactLoader loaderClass="position-absolute" loading={props.loading} />
    ) : null}
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        iclassName="fa fa-object-group"
        pageTitle="Review Question"
        disableTitle="Review Question"
      />

      {/* /Page Header */}

      <CardComp cardTitle="Review Question Form" cardBodyTitle="Information">
        <form onSubmit={props.saveHandler}>
          <div className="row">
            <div className="col-xl-6">
            <div className="form-group row">
                <label className="col-lg-3 col-form-label">
                  Question
                </label>
                <div className="col-lg-9">
                  <textarea
                    name="name"
                    value={name}
                    onChange={props.handleInputField}
                    rows="3"
                    className="form-control"
                    placeholder="Question..."
                    required
                  />
                </div>
              </div>
            <InputSelect
                  labelClass="col-lg-3"
                  selectName="Type"
                  selectClass="col-lg-9"
                  name="type"
                  placeholder="type"
                  value={props.selectType}
                  onChange={props.selectHandler}
                  options={props.list}
                  required
                />
              
             
          <SubmitButton parentClass="text-end" btnName="Submit" />
            </div>
            
          </div>
        </form>
      </CardComp>
    </div>
  </div>
  )
}

export default ReviewPage