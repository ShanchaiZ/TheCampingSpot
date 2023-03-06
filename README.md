# TheCampingSpot
Reviewing Campground using CRUD
installed: npm express, ejs, mongoose, method-override, ejs-mate for making partials for the ejs template engines, Bootstrap for basic aesthetics, joi for server side validation.

Reviews: made associations between user rating and reviews with its campground. atm: 1 campground > many rating rendered on campground show template!

then reorganized into routes and using express router.
then added express sessions: to add flash messages (for error and sucessful actions)

Refactoring:
placed all the files and folders into the MVC structure. 
Added .env file for image cloud uploading and API keys/secret security. This .env file is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code. To enter the cloud credentials, this is the file you need to update! this file wont be seen/tracked on github for security but will be used in the app itself.

authentication:
imported passport.js
created login of user
associating their user authentication with their authorization.
authorization include posting and deleting ONLY their reviews and campgrounds. thru association.

features incorporated:
* Starability => css library used to make star rating. used in show the show template.
* image carousel to see uploaded images, image thumbnails (stored as mongoose virtuals) in edit page and storing/deleting images on cloudinary

Mapbox for map:
* Basic map with a pin will use geocoding so user doesnt have to use lattitude/longtituge/coodinates using mapbox
* a interactable cluster map that shows a collection of campgrounds that redirects to campground of choice using mongoose virtual popups


Completed:
* Full CRUD for campgrounds
* 5 star rating system (library used: starability)
* reviews
* authentication (login) and authorization (cant delete/edit campgrounds that are not yours) (library used: passport.js)
* Setting clientside(bootstrap), Serverside validation (JOI and using some built in mongoose validation)
* storing all the campgrounds, users and reviews on MongoDB and connecting using mongoose.
* image upload to cloud server (API used: cloudinary)
* maps on show page, interactable clustermap of all campgrounds (API used: mapbox)

Prevent Common Issues:
* protecting headers with Helmet
* securing cookies
* Sanitizing htmls
* Creating serverside validator extensions 



Basic set up of campground rating app that has CRUD infrastructure
To-do:

* Styling:
    * Home page landing, Login, Register form, adding map controls
* dealing with common security issues
* refactoring and styling clean up
* deploying the app (using Render)



