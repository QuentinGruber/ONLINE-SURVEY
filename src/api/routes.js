// init package needed

const express = require('express');  // To create the "app"
const cors = require('cors');  // For security issue
const mysql = require('mysql'); // to access the database 
const Sjs = require('@quentingruber/simple-json'); // for json reading
var bodyParser = require('body-parser');  // for POST method
var aes256 = require('aes256'); // for Aes encryption
var sha1 = require('sha1'); // for sha cipher
var randtoken = require('rand-token'); // for random token generation


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


/*  NEW FORM  */
app.post('/new_form', urlencodedParser, function (req, res) {
  const writeJsonFile = require('write-json-file');

var data = {
    AdminToken:req.query.Admin_token,
    Form_name:req.query.Form_name,
    Content: [req.query.Content]
};

(async () => {
    await writeJsonFile('testFORM.json', data  );
})();
  res.send("true")
});

/*  REGISTER  */

// Creating a POST route to our database !
app.post('/sign_up', urlencodedParser, function (req, res) {

  try {
    data = { // Fetch data from POST request
      "Username": req.query.username,
      "Email": req.query.email,
      "Password": req.query.password,
      "Token": req.query.token,
    }
  }
  catch (e) {
    console.error("The POST request is missing Data to register the user : " + e.message)
  }

  connection.getConnection(function (err, connection) {

    function WriteUserInfo(connection) {
      if(data.token == undefined){ // if user doesn't already have an admin token then create one
        data.token = randtoken.generate(16);
      }
      // user creation
      connection.query(
        "INSERT INTO USER VALUES (" + "'" + data.Username + "'" + "," + "'" + data.Email + "'" + "," + "'" + data.Token + "'" + "," + "'" + data.Password + "'" + ");"
        , function (sql_error, results, fields) {
          // If some error occurs, we throw an error.
          if (sql_error) throw res.send("false");

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          res.send("true")
        });

    }

    // Password encryption
    try {
      data.Password = sha1(data.Password);
      data.Password = aes256.encrypt(MariaDB_config.PUB_key, data.Password)
    }
    catch (e) {
      console.error("Password fail to encrypt : " + e.message)
    }
    WriteUserInfo(connection)

  });
});

/*  LOGIN  */

// Creating a POST route to our database !  
app.post('/sign_in', urlencodedParser, function (req, res) {

  try {
    data = { // Fetch data from POST request
      "Username": req.query.username,
      "Password": req.query.password,
    }
  }
  catch (e) {
    console.error("The POST request is missing Data to login the user : " + e.message)
  }

  connection.getConnection(async function (err, connection) {

    // user creation
    connection.query(
      "SELECT Password FROM USER WHERE Username='" + data.Username + "';"
      , function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        if (sql_error) res.send(false);
        if(results.length > 0) var Stored_pass = results[0].Password; // if provided username is in our database
        else{
          res.send(false); // if not send false
          return; // and stop the connection.query
        }
        
        // Stored Password Decryption
        try {
          Stored_pass = aes256.decrypt(MariaDB_config.PUB_key, Stored_pass)
        }
        catch (e) {
          console.error("Stored password fail to decrypt : " + e.message)
        }

        // Submit Password Hasing
        try {
          data.Password = sha1(data.Password);
        }
        catch (e) {
          console.error("Submit password fail to be hashed : " + e.message)
        }

        if (Stored_pass == data.Password) { // if the Submit pass is the same as storage pass
          connection.query( // get the Token of the logged user
            "SELECT Token FROM USER WHERE Username='" + data.Username + "';"
            , function (sql_error, results, fields) {
              res.send(results[0].Token) // return it
            })
          
        }
        else{
          res.send(false);
        }

      });

  });
});

// TOKEN
app.post('/GET_Token', urlencodedParser, function (req, res) {  // ROUTENAME est un exemple

  // Connecting to the database.
  connection.getConnection(function (err, connection) {
  
  // Executing SQL query
  connection.query("SELECT Token FROM USER WHERE Username='" + req.query.Username + "';", function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;
  
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
  });
  });

  // Username
app.post('/GET_Username', urlencodedParser, function (req, res) {  // ROUTENAME est un exemple

  // Connecting to the database.
  connection.getConnection(function (err, connection) {
  
  // Executing SQL query
  connection.query("SELECT Username FROM USER WHERE Token='" + req.query.Token + "';", function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;
    console.log(results) // TODO: remove (not now)
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
  });
  });

// Starting our server.
app.listen(3001, () => {
  console.log('Routes.js running !');
});
