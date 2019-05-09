# Backend

The BugSleuth backend is a server that distributes the Frontend files. 
*(Note: The backend might also store state/connection data for users, but currently
it does not).

## File and Folder Structure

* `index.js` - Entry point. Instantiates a new application and mounts it to a server
* `app.js` - Exposes a factory function for creating the application.
* `config.js` - Server configuration logic. Creates and exposes an object that contains
	the server configuration. This object is passed to the factory function exposed
	from `app.js`.
* `routes.js` - Defines the endpoints and endpoint logic for the application, and exposes
	a router factory function. The factory takes in the configuration object and returns
	a newly created router.
* `files/` - Contains the files for the server to serve. The server is able to
	serve files from a different directory. See the **Environment Variables** section for more information

## Environment Variables

* `SECRET` - Required in production mode; optional otherwise. The server's secret key.
* `PORT` - Optional. The port number the server should listen on. Defaults to `3000`.
* `ASSET_DIR` - Optional. The path to the directory containing the static assets to serve.
Defaults to `src/files/`.
