// utils/streamUpload.js
import streamifier from 'streamifier';
import cloudinary from './cloudinary.js'; // adjust path as per your project

const streamUpload = (fileBuffer, resourceType = 'auto', folder = 'user_uploads') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export default streamUpload;
