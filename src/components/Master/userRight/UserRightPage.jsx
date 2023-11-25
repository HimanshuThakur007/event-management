import React from 'react'
import PageHeader from '../../CustomComp/PageHeader'
import CardComp from '../../CustomComp/CardComp'
import PageHelmet from '../../CustomComp/PageHelmet'
import InputField from '../../CustomComp/InputField'
import SubmitButton from '../../CustomComp/SubmitButton'
import InputSelect from '../../CustomComp/InputSelect'
import InputCheckBox from '../../CustomComp/InputCheckBox'

const UserRightPage = () => {
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="User"
        helmetName="description"
        helmetContent="User Right Page"
      />
      {/* {props.loading ? (
      <ReactLoader loaderClass="position-absolute" loading={props.loading} />
    ) : null} */}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="User Right"
          disableTitle="User Right"
        />

        {/* /Page Header */}

        <CardComp cardTitle="User Right Form" cardBodyTitle="Information">
          <form onSubmit={() => {}}>
            <div className="row">
              <div className="col-12 d-flex">
                <div className="col-xl-6">
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="CRM Tools"
                    selectClass="col-lg-9"
                    name="crmtools"
                    placeholder="CRM Tools"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                </div>
                <div className="col-xl-6"></div>
              </div>
              <div className="col-12 d-lg-flex d-block">
                <div className="col-xl-6 col-12">
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="Leads & Prospects"
                    selectClass="col-lg-9"
                    name="Leads&Prospects"
                    placeholder="Leads & Prospects"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                </div>
                <div className="col-xl-6 col-12">
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="Supervisor"
                    selectClass="col-lg-9"
                    name="supervisor"
                    placeholder="Supervisor"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                </div>
              </div>
              <div className="col-12 d-lg-flex d-block">
                <div className="col-xl-6">
                <label className='col-form-label col-lg-3 col-0'></label>
                  <InputCheckBox checkName="Entry" />
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Master Changes" />
                </div>
              </div>
              <div className="col-12 d-lg-flex d-block">
                <div className="col-xl-6">
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="Customers"
                    selectClass="col-lg-9"
                    name="Customers"
                    placeholder="Customers"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Entry" />
                      <InputCheckBox checkName="Master Changes" />
                    
                </div>
              </div>
             
              <div className="col-12 d-lg-flex d-block">
                <div className="col-xl-6">
                <label className='col-lg-3 col-form-label'>Quotes</label>
                <InputCheckBox checkName='Entry'/>
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Changes" />
                </div>
              </div>
              
              <div className="col-12 d-lg-flex d-block">
                <div className="col-xl-6">
                <InputSelect
                    labelClass="col-lg-3"
                    selectName="Orders&Tickets"
                    selectClass="col-lg-9"
                    name="ordersandtickets"
                    placeholder="Orders & Tickets"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Entry" />
                      <InputCheckBox checkName="Updates" />
                    <InputCheckBox checkName="Changes" />
                 
                </div>
              </div>

              <div className="col-12 d-flex">
                <div className="col-xl-6">
                <label className='col-lg-3 col-form-label'>Invoices</label>
                <InputCheckBox checkName='View'/>
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Entry" />
                    <InputCheckBox checkName="Changes" />
                      <InputCheckBox checkName="Recovery" />
                </div>
              </div>

              <div className="col-12 d-flex">
                <div className="col-xl-6">
                <label className='col-lg-3 col-form-label'>Contracts</label>
                <InputCheckBox checkName='Entry'/>
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Update" />
                 
                    <InputCheckBox checkName="Changes" />
                    
                </div>
              </div>

              <div className="col-12 d-flex">
                <div className="col-xl-6">
                <InputSelect
                    labelClass="col-lg-3"
                    selectName="B2B Network"
                    selectClass="col-lg-9"
                    name="b2bnetwork"
                    placeholder="B2B Network"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                  </div>
               
                <div className="col-xl-6">
                
                </div>
              </div>

              <div className="col-12 d-flex">
                <div className="col-xl-6">
                <label className='col-lg-3 col-form-label'></label>
                <InputCheckBox checkName='Connection'/>
                </div>
                <div className="col-xl-6">
                  <InputCheckBox checkName="Web Store setup" />
                 
                    <InputCheckBox checkName="Newsfeed Posts" />
                   
                </div>
              </div>

              <div className="col-12 d-flex">
                <div className="col-xl-6">
                <InputSelect
                    labelClass="col-lg-3"
                    selectName="Default Page"
                    selectClass="col-lg-9"
                    name="defaultpage"
                    placeholder="Default Page"
                    // value={props.blockOption}
                    // onChange={props.blockHandler}
                    // options={props.blockList}
                    required
                  />
                </div>
                <div className="col-xl-6">
                 
                </div>
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Submit" />
          </form>
        </CardComp>
      </div>
    </div>
  );
}

export default UserRightPage;