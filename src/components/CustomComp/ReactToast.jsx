import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  export const showToastError = (msg)=>{
    toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
    });
  }

const ReactToast = () => {

  return (
    <div>
         <ToastContainer
        // position='top-right'
        autoClose={4000}
     
      />
    </div>
  )
}

export default ReactToast;