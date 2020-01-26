// init package needed

const express = require('express');  // To create the "app"
const cors = require('cors');  // For security issue
const mysql = require('mysql'); // to access the database 
const Sjs = require('@quentingruber/simple-json'); // for json reading
var bodyParser = require('body-parser');  // for POST method
var aes256 = require('aes256'); // for Aes encryption
var sha1 = require('sha1'); // for sha cipher

// get MariaDB config
MariaDB_config = Sjs.extract("src/Config/MariaDBconfig.json");

const connection = mysql.createPool({
  host: MariaDB_config.host, // Your connection adress (localhost).
  user: MariaDB_config.user,     // Your database's username.
  password: MariaDB_config.password,        // Your database's password.
  database: MariaDB_config.database
});


PUB_key = "maxon"  // Aucune id de où mettre ça mais je le met la pour pouvoir le move facile après 

const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000' // only our webapp has access to the database
  }));


var urlencodedParser = bodyParser.urlencoded({ extended: false }) // use to read Encoded http query


/*  REGISTER  */

// Creating a POST route to our database ! We can have multiple one ! 
app.post('/sign_up', urlencodedParser, function (req, res) {

  try {
    data = { // Fetch data from POST request
      "Pseudo": req.query.name,
      "Email": req.query.email,
      "Password": req.query.password,
      "Token": req.query.token,
    }
  }
  catch (e) {
    throw new error("The POST request is missing Data to register the user")
  }

  connection.getConnection(function (err, connection) {

    function WriteUserInfo(connection) {
      // user creation
      connection.query(
        "INSERT INTO USER VALUES (" + "'" + data.Pseudo + "'" + "," + "'" + data.Email + "'" + "," + "'" + data.Token + "'" + "," + "'" + data.Password + "'" + ");"
        , function (error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          res.send(results)
        });

    }

    // Password encryption
    try {
      data.Password = sha1(data.Password);
      data.Password = aes256.encrypt(PUB_key, data.Password)
    }
    catch (e) {
      throw new error("Password fail to encrypt")
    }
    WriteUserInfo(connection)

  });
});

/*  LOGIN  */

// Creating a POST route to our database ! We can have multiple one ! 
app.post('/sign_in', urlencodedParser, function (req, res) {

  try {
    data = { // Fetch data from POST request
      "Pseudo": req.query.name,
      "Password": req.query.password,
    }
  }
  catch (e) {
    throw error("The POST request is missing Data to login the user")
  }

  connection.getConnection(async function (err, connection) {

    function GetUserPassword(connection) {
      // user creation
      connection.query(
        "SELECT Password FROM USER WHERE Pseudo='"+data.Pseudo+"';"
        , function (error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) res.send(false);
          console.log("c")
          return results;

        });

    }
    var Stored_pass = await GetUserPassword(connection)
    // Stored Password Decryption
    try {
      Stored_pass = aes256.decrypt(PUB_key, Stored_pass)
    }
    catch (e) {
      throw error("Stored password fail to decrypt")
    }

    // Submit Password Hasing
    try {
      data.Password = sha1(data.Password);
    }
    catch (e) {
      throw error("Submit password fail to be hashed")
    }
    
    if(Stored_pass == data.Password){
      res.send(true);
    }

  });
});



// Starting our server.
app.listen(3001, () => {
  console.log('http://localhost:3001/sign_up running !');
});
