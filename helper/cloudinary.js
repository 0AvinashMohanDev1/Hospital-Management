const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
  secure: true,
});

async function imageUploader(image,folder){
  try {
      const result=await cloudinary.uploader.upload(image,{folder});
      return result.secure_url;
  } catch (error) {
      console.log({error:error.message})
  }
};

module.exports=imageUploader;