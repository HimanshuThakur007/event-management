import React from 'react';
import ScaleLoader  from "react-spinners/ScaleLoader";


function ReactLoader(props) {

  // const style:any = {textAlign: 'center',alignItem:'center'};

  return (
<>
<div className="loader-box" style={{height:'100vh'}}>
        <div className={props.loaderClass} style={{marginLeft:'0%',marginTop:'0%'}}>
        <ScaleLoader  color="grey"  loading={props.loading}
        
        aria-label="Loading Spinner"
        data-testid="loader" 
        />
        <p>Loading ...</p>
        </div>
        </div>

      
   </>
  );
}

export default ReactLoader;