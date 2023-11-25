import React from 'react'

const CardComp = (props) => {
  return (
    <>
      <div className="row">
          <div className="col-md-12">
      <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">{props.cardTitle}</h4>
              </div>
              <div className="card-body">
                <h4 className="card-title">{props.cardBodyTitle}</h4>
               {props.children}
              </div>
            </div>
            </div>
            </div>
    </>
  )
}

export default CardComp;