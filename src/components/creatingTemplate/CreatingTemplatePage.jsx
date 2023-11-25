import React from 'react'
import PageHelmet from '../CustomComp/PageHelmet'
import PageHeader from '../CustomComp/PageHeader'
import CardComp from '../CustomComp/CardComp'

const CreatingTemplatePage = () => {
  return (
<div className="page-wrapper">
      <PageHelmet
        helmetTitle="User"
        helmetName="description"
        helmetContent="CreatingTemplate Page"
      />
      {/* {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null} */}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Create Template"
          disableTitle="Create Template"
        />

        {/* /Page Header */}

        <CardComp
          cardTitle="Create Template Form"
          cardBodyTitle="Information"
        >
        
        </CardComp>
      </div>
    </div>
  )
}

export default CreatingTemplatePage;