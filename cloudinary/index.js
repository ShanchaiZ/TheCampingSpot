const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//Set up cloudinary configuration for storage:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


//Set up the Storage Object Specifications in the Cloudinary Account:
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "TheCampSpot",
        allowedFormats: ["jpeg", "png", "jpg",]
    }

});


module.exports = {
    cloudinary,
    storage
}