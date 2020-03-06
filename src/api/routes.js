// init package needed
require("dotenv").config();
const express = require('express');  // To create the "app"
const cors = require('cors');  // For security issue
const mysql = require('mysql'); // to access the database 
const Sjs = require('@quentingruber/simple-json'); // for json reading
var bodyParser = require('body-parser');  // for POST method

// Export func
const Forms = require('./routes/Forms');
const Login_Register = require('./routes/Login_Register');

// get MariaDB config
MariaDB_config = Sjs.extract("src/Config/MariaDBconfig.json");

const connection = mysql.createPool({
  host: MariaDB_config.host, // Your connection address (localhost).
  user: MariaDB_config.user,     // Your database's username.
  password: MariaDB_config.password,        // Your database's password.
  database: MariaDB_config.database,
  connectionLimit: MariaDB_config.ConnectionLimit
});

const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000' // only our webapp has access to the database
  }));


var urlencodedParser = bodyParser.urlencoded({ extended: false }) // use to read Encoded http query

app.get('/', function (req, res) { // test 
  res.send("coucou");
});

/*  NEW FORM  */
app.post(process.env.REACT_APP_API_ROUTE + 'new_form', urlencodedParser, function (req, res) {
  Forms.create_new_form(req, res);
});

/*  REGISTER  */

app.post(process.env.REACT_APP_API_ROUTE + 'sign_up', urlencodedParser, function (req, res) {
  Login_Register.register(req, res, connection);

});

/*  LOGIN  */

app.post(process.env.REACT_APP_API_ROUTE + 'sign_in', urlencodedParser, function (req, res) {
  Login_Register.login(req, res, connection);

});

// Check if a username exist in our db
app.post(process.env.REACT_APP_API_ROUTE + 'Check_Username', urlencodedParser, function (req, res) {
  Login_Register.Check_Username(req, res, connection)
});

// Check if an email exist in our db
app.post(process.env.REACT_APP_API_ROUTE + 'Check_Email', urlencodedParser, function (req, res) {
  Login_Register.Check_Email(req, res, connection)
});

// Starting our server.
app.listen(3001, () => {
  console.log('Routes.js running !' + process.env.NODE_ENV);
});
