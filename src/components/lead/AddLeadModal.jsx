import React from 'react'

const AddLeadModal = () => {
  return (
    <>
      {/* Modal */}
      <div className="modal right fade" id="add_lead" tabIndex={-1} role="dialog" aria-modal="true">
          <div className="modal-dialog" role="document">
            <button type="button" className="close md-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-center">Add Lead</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <form>
                      <h4>Lead Information</h4>
                      <div className="form-group row">
                        <div className="col-md-12"><label className="col-form-label">Name <span className="text-danger">*</span></label></div>
                        <div className="col-md-4">
                          <input className="form-control" type="text" placeholder="Prefix" name="prefix" />
                        </div>
                        <div className="col-md-4">
                          <input className="form-control" type="text" placeholder="First name" name="prefix-name" />
                        </div>
                        <div className="col-md-4">
                          <input className="form-control" type="text" placeholder="Last name" name="last-name" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Organization</label>
                          <select className="form-control">
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="col-sm-6">
                          <label className="col-form-label">Title</label>
                          <input type="text" className="form-control" name="title" placeholder="Title" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Lead Status</label>
                          <select className="form-control">
                            <option>Select</option>
                            <option>Open - Contacted</option>
                            <option>Open - Not Contacted</option>
                          </select>
                        </div>
                        <div className="col-sm-6">
                          <label className="col-form-label">User Responsible</label>
                          <select className="form-control">
                            <option>Select</option>
                            <option>John Doe</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Lead Rating</label>
                          <input type="number" className="form-control" name="rating" placeholder="Rating" />
                        </div>
                      </div>
                      <h4>Additional Information</h4>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Email</label>
                          <input type="text" className="form-control" name="email" placeholder="Email" />
                        </div>
                        <div className="col-sm-6">
                          <label className="col-form-label">Email Opted out</label>
                          <div>
                            <label className="container-checkbox">
                              <input type="checkbox" />
                              <span className="checkmark" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Phone</label>
                          <input type="text" className="form-control" name="phone" placeholder="Phone" />
                        </div>
                        <div className="col-sm-6">
                          <label className="col-form-label">Mobile Phone</label>
                          <input type="text" className="form-control" name="m-phone" placeholder="Phone" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Fax</label>
                          <input type="text" className="form-control" name="fax" placeholder="Fax" />
                        </div>
                        <div className="col-sm-6">
                          <label className="col-form-label">Website</label>
                          <input type="text" className="form-control" name="website" placeholder="Website" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Industry</label>
                          <input type="text" className="form-control" name="assistant-phone" placeholder="Industry" />
                        </div>
                        <div className="col-sm-6">
                          <label className="col-form-label">Number of Employees</label>
                          <input type="text" className="form-control" name="employees" placeholder="Number of Employees" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Lead Source</label>
                          <select className="form-control">
                            <option>Web</option>
                            <option>Phone Enquiry</option>
                            <option>Partner Referral</option>
                            <option>Purchased List</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <h4>Address Information</h4>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label className="col-form-label">Mailing Address</label>
                          <textarea className="form-control" rows={3} name="address" placeholder="Address" defaultValue={""} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <input type="text" className="form-control" placeholder="City" name="city" />
                        </div>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" placeholder="State/Provience" name="state" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <input type="text" className="form-control" placeholder="Postal Code" name="postal" />
                        </div>
                        <div className="col-sm-6">
                          <select className="form-control">
                            <option>India</option>
                            <option>US</option>
                            <option>Japan</option>
                          </select>
                        </div>
                      </div>
                      <h4>Description Information</h4>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label className="col-form-label">Description </label>
                          <textarea className="form-control" rows={3} id="description" placeholder="Description" defaultValue={""} />
                        </div>
                      </div>
                      <h4>Tag Information</h4>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label className="col-form-label">Tag List</label>
                          <input type="text" className="form-control" name="tag-name" placeholder="Tag List" />
                        </div>
                      </div>
                      <h4>Permissions</h4>
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="col-form-label">Permission</label>
                          <select className="form-control">
                            <option>Task Visibility</option>
                            <option>Private Task</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-center py-3">
                        <button type="button" className="border-0 btn btn-primary btn-gradient-primary btn-rounded">Save</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-secondary btn-rounded">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>{/* modal-content */}
          </div>{/* modal-dialog */}
        </div>{/* modal */}
    </>
  )
}

export default AddLeadModal