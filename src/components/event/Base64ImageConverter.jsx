import React from 'react'
export const Base64ImageConverter = ({ base64String,style }) => {
  const imageUrl = `${base64String}`;
  return <img src={imageUrl} style={style} alt="Base64 Image" />;
};