import React from 'react'
import InputSelect from '../CustomComp/InputSelect'
import DateTimeInput from '../CustomComp/DateTimeInput'

const ReviewTaskModal = (props) => {
  return (
    <>
     <div className="modal right fade" id="add_review" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <button type="button" className="close md-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center">Questions</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <h4>Review Question</h4>
                    <div className="form-group row">
                     
                      <div className="col-sm-12">
                      <InputSelect
                        labelClass=""
                        selectName="Select Questions"
                        selectClass="col-lg-12"
                        name="EType"
                        //   placeholder="Yes/No"
                        value={props.multiQueValue}
                        onChange={props.handleMultiQuestionChange}
                        options={props.reviewData}
                        isMulti
                       
                        required
                      />
             {props.multiQueValue.map((item,index)=>{
                return (
                    <div className="col-12 col-md-6 col-lg-12 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <h5 className="card-title mb-0 text-primary">Review Questions : {index+1}</h5>
                                </div>
                                <ul className="list-group list-group-flush d-flex">
                                    <li className="list-group-item"> {item.label}</li>
                                </ul>
                            </div>
                        </div>
                );
             })}
                      
                        
                      </div>
                    </div>
                    <div className="text-center py-3">
                      {/* <button type="button" className="border-0 btn btn-primary btn-gradient-primary btn-rounded">Save</button>&nbsp;&nbsp; */}
                      {/* <button type="button" className="btn btn-secondary btn-rounded">Cancel</button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>{/* modal-content */}
        </div>{/* modal-dialog */}
      </div>
    </>
  )
}

export default ReviewTaskModal