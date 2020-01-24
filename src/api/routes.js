
const express = require('express');  // To create the "app"
const cors = require('cors');  // For security issue
const mysql = require('mysql'); // to access the database 
const Sjs = require('@quentingruber/simple-json'); // for json reading
var bodyParser = require('body-parser');  // for POST method

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
  var name = req.query.name;
  var email = req.query.email;
  var pass = req.query.password;
  var token = req.query.token;

  data = {
    "Pseudo": name,
    "Email": email,
    "Password": pass,
    "Token": token,
  }

  connection.getConnection(function (err, connection) {

    function WriteUserInfo(connection) {
      // Creation du user
      connection.query(
        "INSERT INTO USER VALUES (" + "'" + data.Pseudo + "'" + "," + "'" + data.Email + "'" + "," + "'" + data.Token + "'" + "," + "'" + data.Password + "'" + ");"
        , function (error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          res.send(results)
        });

    }

    // Creation du user
    connection.query(
      "SELECT AES_ENCRYPT(sha(" + data.Password + "),'testing');"
      , function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;
        data.Password = (Object.values(results[0])[0])
        console.log(data.Password)
        WriteUserInfo(connection)
      });

  });
});


// Starting our server.
app.listen(3001, () => {
  console.log('Go to http://localhost:3001/usersdb so you can see the data.');
});
