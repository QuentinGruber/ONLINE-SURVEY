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


const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000' // only our webapp has access to the database
  }));


var urlencodedParser = bodyParser.urlencoded({ extended: false }) // use to read Encoded http query

// Creating a POST route to our database ! We can have multiple one ! 
app.post('/sign_up', urlencodedParser, function (req, res) {

  data = { // Fetch data from POST request
    "Pseudo": req.query.name,
    "Email": req.query.email,
    "Password": req.query.password,
    "Token": req.query.token,
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
      data.Password = sha1(data.Password);
      data.Password = aes256.encrypt("maxon", data.Password)
        WriteUserInfo(connection)

  });
});


// Starting our server.
app.listen(3001, () => {
  console.log('http://localhost:3001/sign_up running !');
});
