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

Basic set up of campground rating app that has CRUD infrastructure
To-do:
* majority of modeling info
* styling (starability)
* User authentication  (using passport.js )
* Reviews - 1 campground > many rating. In Future: 1 user > many campground > many rating?. also will need to delete ALL reviews once associated campground is deleted. 
* maps
* proper uploading of images
* dealing with common security issues
* refactoring and styling clean up (MVC)
* deploying the app



