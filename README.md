# ChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

This web app Uses NodeJS to serve an angular client as a web chat app with groups, channels and users. The server utilises express, socketio, formidable and mongodb database.

The app allows for the login of a user

## Database

mongodb is required to be installed with services running, database init files are located in the server/route directory. The database collections are initialised by navigating to the directory and running `node initialiseGroups.js` and `node intialiseUsers.js`

To log in as an Admin, username is Admin, pw is Admin.
To log in as a User, username is User, pw is User.

## Development server

Run `nodemon server.js` from the server directory for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test ./unitTest/test.js` to execute the unit tests

## Further help


