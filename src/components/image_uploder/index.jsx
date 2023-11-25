
import React, { useState } from 'react'
import './img.css'

const ImagesUploder = (props) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleImageChange = (e) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files).map((file) =>
//         URL.createObjectURL(file)
//       );

//     // console.log("filesArray: ", filesArray.length);   

//  setSelectedFiles((prevImages) =>{ 
//   if(filesArray.length > 2){
//     alert("Image length less than two")
//     return prevImages
//   }else{
//     return [...filesArray]}
//   }); 

 

//   Array.from(e.target.files).map(
//     (file) => URL.revokeObjectURL(file) // avoid memory leak
//   );
//   }};
  
// // console.log("SSSSSSSS",selectedFiles)
//   const renderPhotos = (source) => {
//     //  console.log("source: ", source);
//     return source.map((photo) => {
//       return <img className='img_upload' src={photo} alt="" key={photo} />;
//     })
//   };
const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
 
  React.useEffect(()=>{
    props.setEventImages(base64Images)
    console.log('image from imgupl3',base64Images)
  },[base64Images,images])

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;

    // Iterate through selected images and add them to the 'images' state array
    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];
      setImages((prevImages) => [...prevImages, image]);

      // Convert the selected image to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setBase64Images((prevBase64Images) => [...prevBase64Images, base64Image]);
      };
      reader.readAsDataURL(image);
    }
  };
  return (
    <div className='row'>
      <input type="file" id="file" multiple onChange={handleImageChange} />
      <div className='col-lg-12 d-flex'>
      <div className="col-md-4">
        <label htmlFor="file" className="label" style={{ width: "100%", margin: 0, height: "110px" }}>
          <i className="material-icons">add_a_photo</i>
        </label>
      </div>
      <div className="result col-md-8 ">
      {base64Images.map((base64, index) => (
        
        <div style={{border: "2px solid #404040",borderRadius:"20px" }}>
          <img key={index} className='img_upload' src={base64} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ImagesUploder;
