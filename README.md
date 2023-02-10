# TheCampingSpot
Reviewing Campground using CRUD
installed: npm express, ejs, mongoose, method-override, ejs-mate for making partials for the ejs template engines, Bootstrap for basic aesthetics, joi for server side validation.

Reviews: made associations between user rating and reviews with its campground. atm: 1 campground > many rating rendered on campground show template!

then reorganized into routes and using express router.
then added express sessions: to add flash messages (for error and sucessful actions)

authentication:

Basic set up of campground rating app that has CRUD infrastructure
To-do:
* majority of modeling info
* styling
* User authentication  (using passport.js )
* Reviews - 1 campground > many rating. In Future: 1 user > many campground > many rating?. also will need to delete ALL reviews once associated campground is deleted. 
* maps


