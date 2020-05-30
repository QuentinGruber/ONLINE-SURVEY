// init package needed
require("dotenv").config();
const express = require("express"); // To create the "app"
const cors = require("cors"); // For security issue
const mysql = require("mysql"); // to access the database
const session = require("express-session");

// Export func
const FormsController = require("./controllers/FormsController");
const AuthController = require("./controllers/AuthController");
const LinkedinAPIController = require("./controllers/LinkedinAPIController");

// get MariaDB config
const connection = mysql.createPool({
  host: process.env.REACT_APP_HOST, // Your connection address (localhost).
  user: process.env.REACT_APP_USER, // Your database's username.
  password: process.env.REACT_APP_PASS, // Your database's password.
  database: process.env.REACT_APP_DB,
  connectionLimit: process.env.REACT_APP_CLIMIT,
});

const app = express();

app.use(
  express.json(),

  session({
    resave: true,
    saveUninitialized: false,
    name: "SessionID",
    secret: process.env.REACT_APP_SECRET_KEY,
  }),

  cors({
    credentials: true,
    origin: [
      "https://www.online-survey.app",
      "https://online-survey.app",
      "http://localhost:3000",
    ], // only our webapp has access to the database
  })
);

app.get("/", function (req, res) {
  res.send("Api server connected !");
});

app.get("/welcome", function (req, res) {
  // get name of a logged user
  if (req.session.name === undefined) res.send(req.session.username);
  else res.send(req.session.name);
});

app.get("/islogin", function (req, res) {
  // get name of a logged user
  if (req.session.user_id === undefined) res.send(false);
  else res.send(true);
});

/* User form*/

app.get("/myform", function (req, res) {
  FormsController.get_user_form_content(req, res, connection);
});

/* MODIFY FORM CONTENT */

app.put("/editform/", function (req, res) {
  FormsController.modify_form(req, res, connection);
});

/* GET FORM CONTENT */

app.get("/form/*", function (req, res) {
  FormsController.get_form_content(req, res, connection);
});

/* Register Form response */

app.post("/send_form/*", function (req, res) {
  FormsController.register_answer(req, res, connection);
});

/*  NEW FORM  */
app.post("/new_form", function (req, res) {
  FormsController.create_new_form(req, res, connection);
});

/*  REGISTER  */

app.post("/sign_up", function (req, res) {
  AuthController.register(req, res, connection);
});

/*  LOGIN  */

app.post("/sign_in", function (req, res) {
  AuthController.login(req, res, connection);
});

// Check if a username exist in our db
app.post("/Check_Username", function (req, res) {
  AuthController.Check_Username(req, res, connection);
});

// Check if an email exist in our db
app.post("/Check_Email", function (req, res) {
  AuthController.Check_Email(req, res, connection);
});

// Check registration type to allow api login
app.post("/Check_RegistrationType", function (req, res) {
  AuthController.Check_RegistrationType(req, res, connection);
});

app.delete("/Disconnect", function (req, res) {
  try {
    req.session.destroy();
    res.send(true);
  } catch (e) {
    console.log("Error while disconnecting : " + e);
    res.send(false);
  }
});

/* API EXTERNE */

app.post("/linkedin", function (req, res) {
  LinkedinAPIController.LoginWithLinkedin(req, res);
});

// Starting our server.
app.listen(3001, () => {
  console.log("Routes.js running !");
});
