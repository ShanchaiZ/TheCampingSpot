![theCampingSpotBanner](./public/campgroundScreenshots/theCampingSpotBanner.png)
# TheCampingSpot

![Static Badge](https://img.shields.io/badge/Language%20-%20JavaScript-blue)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Static Badge](https://img.shields.io/badge/CSS%20-%20Bootstrap%20-%20purple)
![Static Badge](https://img.shields.io/badge/%20-%20node.js-green)
![Static Badge](https://img.shields.io/badge/express.js%20-%20brightgreen)
![Static Badge](https://img.shields.io/badge/Image%20Storage-%20Cloudinary%20API%20-%20blue)
![Static Badge](https://img.shields.io/badge/Map%20and%20Location-%20Mapbox%20API%20-%20navy)
![Static Badge](https://img.shields.io/badge/Deployment-%20Render.com%20-%20skyblue)
![Static Badge](https://img.shields.io/badge/Version%20Control-%20Github-%20black)

## Description
A FullStack Application where users can login/register to share their camping experiences by creating, viewing, updating, uploading images, and deleting their campgrounds while leaving a star rating and review.

> Github Repository Link: [https://github.com/ShanchaiZ/TheCampingSpot](https://github.com/ShanchaiZ/TheCampingSpot)

> Deployed App (Render) Link: [Click to Begin Your Camping Adventure!](https://thecampingspot-kcqj.onrender.com)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Technologies Used](#technologies-used)
5. [License](#license)
6. [Contributions/Questions](#contributions)

## Installation

Type "npm install" in the console to install the dependencies that this application requires (Node, Express, Mongoose, etc.) to run. The required dependencies are listed below:

```
  "dependencies": {
    "@mapbox/mapbox-sdk": "^0.15.0",
    "cloudinary": "^1.34.0",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "ejs-mate": "^4.0.0",
    "express": "^4.18.2",
    "express-mongo-sanitize": "^2.2.0",
    "express-session": "^1.17.3",
    "helmet": "^6.0.1",
    "joi": "^17.7.1",
    "method-override": "^3.0.0",
    "mongoose": "^6.9.1",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
    "passport": "^0.6.0",
    "passport-local-mongoose": "^7.1.2",
    "sanitize-html": "^2.10.0"
  }
```

## Usage
After installing the necessary dependencies, type "npm start" in your terminal will run the application from your local machine.
<p> Alternatively, please click on the deployed link if you wish to use the application but do not want to save a copy.</p>
<p> To use this application, please Register/Login to add or make edits to your own campground and reviews.</p>

## Features

* <b> User Authentication and Authorization </b> - For login/register to use the app 
* <b>Image upload</b> - To share pictures of your campground 
* <b> 5 Star Rating System </b> - To share your campging experience with others
* <b> Image carousel </b> - View the uploaded images, image thumbnails when editing
* <b> Interactable Cluster Map </b> - Shows a collection of campgrounds that redirects to campground of your choice

## Screenshots:

### Landing Page:
![landingPage](./public/campgroundScreenshots/landingPage.jpg)

### Register Form:
![registerForm](./public/campgroundScreenshots/registerForm.jpg)

### Login Form:
![loginForm](./public/campgroundScreenshots/loginForm.jpg)

### Campground Index Page with ClusterMap:
![indexPage](./public/campgroundScreenshots/campgroundIndexMap.jpg)

### Display Campground Details Page with Review:
![displayCampground](./public/campgroundScreenshots/campgroundDetailsReview.jpg)

### Create a Campground Form:
![createPage](./public/campgroundScreenshots/newCampgroundForm.jpg)

### Edit a Campground Form:
![editPage](./public/campgroundScreenshots/editCampgroundForm.jpg)



#  Technologies Used

* <b>CSS and Bootstrap</b> - (Styling)
* <b>Javascript</b> - (Dictates Application Logic)
* <b>Node.js</b> - (Manage routes and Servers)
* <b>Express.js</b> - (Web Application framework)
* <b>Express-Sessions</b> - (Sessions and Cookies)
* <b>EJS</b> - (HTML Templating Engine)
* <b>Joi</b> - (Server-side Validation)
* <b>Connect-flash </b> - (Flash messages for action feedbacks)
* <b>Mongoose</b> - (Object Data Modeling library for MongoDB and Node.js)
* <b>MongoDB, MongoDB Atlas</b> - (Cloud Database for storing data)
* <b>Cloudinary</b> - (Cloud Image Storing)
* <b>Passport.js</b> - (Login Authentication) 
* <b>Mapbox</b> - (Geocoding/Map display/Cluster Map) 
* <b>Helmet</b> - (Web Security)
* <b>Github</b> - (Version Control)
* <b>Render</b> - (Live Link Deployment)


#  License
This project is under the MIT License.

# Contributions

Shanchai Zahid (Github: [ShanchaiZ](https://github.com/ShanchaiZ), Email: shanchai.zahid@gmail.com).
<br>

~ A Special Thank you for the Udemy Webdev Bootcamp team for all the help and hardwork in helping me create this app! ~ 
