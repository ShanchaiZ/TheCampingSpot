const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//Set up cloudinary configuration for storage:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


//Set up the Storage Specifications in the cloudinary account:
const storage = new CloudinaryStorage({
    cloudinary,
    folder: "TheCampSpot",
    allowedFormats: ["jpeg", "png", "jpg",]
});


module.exports = {
    cloudinary,
    storage
}