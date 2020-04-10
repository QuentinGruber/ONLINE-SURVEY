# Online-Survey

## Setup .env

Choose as a template: .env development or .env production.

Do not change value of :

- **REACT_APP_API_URL**
- **REACT_APP_URL**
- **API_ROUTE**

Change :

- **REACT_APP_HOST** *the host of your DB*
- **REACT_APP_USER** *the user you want to use to manipulate your db*
- **REACT_APP_PASS** *password of the user account*
- **REACT_APP_DB** *your DB name*
- **REACT_APP_CLIMIT** *number of simulataneous connection the server will handle (int)*
- **REACT_APP_SECRET_KEY** *(need to be a string)*

## Quick install 

### Auto

* `npm run quick-install`

### Manually

* `npm i ` to install package dependencies
* `db-migrate up` db migrations (On windows & macOS add `npx` at the beginning of the command)

## Useful command

* `npm start` to start frontend server
* `npm run api` to start backend server
* `npm i` to install package dependencies
* `npm run db-set` to setup tables
* `db-migrate down` to remove tables
* `npm run db-reset` to reset tables

