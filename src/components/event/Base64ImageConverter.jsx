import React from 'react'
export const Base64ImageConverter = ({ base64String }) => {
  const imageUrl = `${base64String}`;
  return <img src={imageUrl} alt="Base64 Image" />;
};