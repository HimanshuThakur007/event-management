import React from 'react'
import PageHeader from '../../CustomComp/PageHeader'
import CardComp from '../../CustomComp/CardComp'
import PageHelmet from '../../CustomComp/PageHelmet'

const UserEventPage = () => {
  return (
    <div className="page-wrapper">
    <PageHelmet
      helmetTitle="User"
      helmetName="description"
      helmetContent="User Evant Page"
    />
    {/* {props.loading ? (
      <ReactLoader loaderClass="position-absolute" loading={props.loading} />
    ) : null} */}
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        iclassName="fa fa-object-group"
        pageTitle="User Event"
        disableTitle="User Event"
      />

      {/* /Page Header */}

      <CardComp
        cardTitle="User Event Form"
        cardBodyTitle="Information"
      >
      
      </CardComp>
    </div>
  </div>
  )
}

export default UserEventPage;