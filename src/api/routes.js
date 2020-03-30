// init package needed
require("dotenv").config();
const express = require('express');  // To create the "app"
const cors = require('cors');  // For security issue
const mysql = require('mysql'); // to access the database 
const session = require('express-session')
const bodyParser = require('body-parser');  // for POST method

// Export func
const FormsController = require('./controllers/FormsController');
const AuthController = require('./controllers/AuthController');
const LinkedinAPIController = require('./controllers/LinkedinAPIController')

// get MariaDB config
const connection = mysql.createPool({
  host: process.env.REACT_APP_HOST, // Your connection address (localhost).
  user: process.env.REACT_APP_USER,     // Your database's username.
  password: process.env.REACT_APP_PASS,        // Your database's password.
  database: process.env.REACT_APP_DB,
  connectionLimit: process.env.REACT_APP_CLIMIT
});

const app = express();


app.use(

  session({resave: true,
  saveUninitialized: false ,name: "SessionID",secret: process.env.REACT_APP_SECRET_KEY}),

  cors({credentials: true,
    origin: ['https://www.online-survey.app','https://online-survey.app','http://localhost:3000'] // only our webapp has access to the database
  })

);



var urlencodedParser = bodyParser.urlencoded({ extended: false }) // use to read Encoded http query

app.get('/', function (req, res) { 
  res.send("Api server connected !");
});


app.get('/welcome', function (req, res) {   // get name of a logged user
  if(req.session.name === undefined)
    res.send(req.session.username);
  else
    res.send(req.session.name);
});

/*  NEW FORM  */
app.post('/new_form', urlencodedParser, function (req, res) {
  FormsController.create_new_form(req, res);
});

/*  REGISTER  */

app.post('/sign_up', urlencodedParser, function (req, res) {
  AuthController.register(req, res, connection);

});

/*  LOGIN  */

app.post('/sign_in', urlencodedParser, function (req, res) {
  AuthController.login(req, res, connection);

});

// Check if a username exist in our db
app.post('/Check_Username', urlencodedParser, function (req, res) {
  AuthController.Check_Username(req, res, connection)
});

// Check if an email exist in our db
app.post('/Check_Email', urlencodedParser, function (req, res) {
  AuthController.Check_Email(req, res, connection)
});

// Check registration type to allow api login
app.post('/Check_RegistrationType', urlencodedParser, function (req, res) {
  AuthController.Check_RegistrationType(req, res, connection)
});

app.delete('/Disconnect', urlencodedParser, function (req, res) {
  try{
  req.session.destroy();
  res.send(true)
  }
  catch(e){
    console.log("Error while disconnecting : "+ e)
    res.send(false)
  }
});

/* API EXTERNE */

app.post('/linkedin', urlencodedParser, function (req, res) {
  LinkedinAPIController.LoginWithLinkedin(req, res)
});


// Starting our server.
app.listen(3001, () => {
  console.log('Routes.js running !');
});
