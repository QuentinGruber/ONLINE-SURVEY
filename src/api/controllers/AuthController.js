const aes256 = require("aes256"); // for Aes encryption
const sha1 = require("sha1"); // for sha cipher
const jwt = require("jsonwebtoken");
const log = require("log-to-file");

exports.register = function (req, res, connection) {
  try {
    var decoded = jwt.verify(
      req.query.jwt_token,
      process.env.REACT_APP_SECRET_KEY
    );
    data = {
      // Fetch data from POST request
      Username: decoded.username,
      Email: decoded.email,
      Password: decoded.password,
      Registration_type: decoded.registration_type,
      Lname: decoded.lname,
      Fname: decoded.fname,
    };
  } catch (e) {
    log(
      JSON.stringify(
        "The POST request is missing Data to register the user : " + e.message
      ),
      "crash.log"
    );
  }

  connection.getConnection(function (err, connection) {
    function encrypt_password() {
      // Password encryption
      try {
        data.Password = sha1(data.Password);
        data.Password = aes256.encrypt(
          process.env.REACT_APP_SECRET_KEY,
          data.Password
        );
        WriteUserInfo(req, res, connection);
      } catch (e) {
        log(
          JSON.stringify("Password fail to encrypt : " + e.message),
          "crash.log"
        );
        if (!res.headersSent) {
          res.send("false");
        }
      }
    }

    function WriteUserInfo(req, res, connection) {
      // user creation
      if (data.Registration_type == "0") {
        connection.query(
          "INSERT INTO users (username,mail,pass,registration_type) VALUES (" +
            "'" +
            data.Username +
            "'" +
            "," +
            "'" +
            data.Email +
            "'" +
            "," +
            "'" +
            data.Password +
            "'" +
            "," +
            "'" +
            data.Registration_type +
            "'" +
            ");",
          function (sql_error, results, fields) {
            // If some error occurs, we throw an error.
            try {
              if (sql_error) {
                throw console.error(sql_error);
              }

              // store the user_id in session
              req.session.user_id = results.insertId;
              if (!res.headersSent) {
                res.send("true");
              }
              connection.release();
            } catch (e) {
              log(JSON.stringify(e), "crash.log");
              if (!res.headersSent) {
                res.send("false");
              }
              connection.release();
            }
          }
        );
      }
      if (data.Registration_type == "1") {
        connection.query(
          "INSERT INTO users (username,first_name,last_name,mail,registration_type) VALUES (" +
            "'" +
            data.Username +
            "'" +
            "," +
            "'" +
            data.Fname +
            "'" +
            "," +
            "'" +
            data.Lname +
            "'" +
            "," +
            "'" +
            data.Email +
            "'" +
            "," +
            "'" +
            data.Registration_type +
            "'" +
            ");",
          function (sql_error, results, fields) {
            // If some error occurs, we throw an error.
            try {
              if (sql_error) {
                throw console.error(sql_error);
              }
              // store the user_id in session
              req.session.user_id = results.insertId;
              if (!res.headersSent) {
                res.send("true");
              }
              connection.release();
            } catch (e) {
              if (!res.headersSent) {
                res.send("false");
              }
              connection.release();
              log(JSON.stringify(e), "crash.log");
            }
          }
        );
      }
      if (data.Registration_type == "2") {
        connection.query(
          "INSERT INTO users (username,first_name,last_name,mail,registration_type) VALUES (" +
            "'" +
            data.Username +
            "'" +
            "," +
            "'" +
            data.Fname +
            "'" +
            "," +
            "'" +
            data.Lname +
            "'" +
            "," +
            "'" +
            data.Email +
            "'" +
            "," +
            "'" +
            data.Registration_type +
            "'" +
            ");",
          function (sql_error, results, fields) {
            // If some error occurs, we throw an error.
            try {
              if (sql_error) {
                throw console.error(sql_error);
              }

              // store the user_id in session
              req.session.user_id = results.insertId;
              if (!res.headersSent) {
                res.send("true");
              }
              connection.release();
            } catch (e) {
              if (!res.headersSent) {
                res.send("false");
              }
              connection.release();
              log(JSON.stringify(e), "crash.log");
            }
          }
        );
      }
      if (data.Registration_type == "3") {
        connection.query(
          "INSERT INTO users (username,mail,registration_type) VALUES (" +
            "'" +
            data.Username +
            "'" +
            "," +
            "'" +
            data.Email +
            "'" +
            "," +
            "'" +
            data.Registration_type +
            "'" +
            ");",
          function (sql_error, results, fields) {
            // If some error occurs, we throw an error.
            try {
              if (sql_error) {
                throw console.error(sql_error);
              }

              // store the user_id in session
              req.session.user_id = results.insertId;
              if (!res.headersSent) {
                res.send("true");
              }
              connection.release();
            } catch (e) {
              if (!res.headersSent) {
                res.send("false");
              }
              connection.release();
              log(JSON.stringify(e), "crash.log");
            }
          }
        );
      }
    }
    // start by encrypt password if standard register
    if (data.Registration_type == "0") {
      encrypt_password();
    } else {
      WriteUserInfo(req, res, connection);
    }
  });
};

exports.login = function (req, res, connection) {
  try {
    var decoded = jwt.verify(
      req.query.jwt_token,
      process.env.REACT_APP_SECRET_KEY
    );
    data = {
      // Fetch data from POST request
      Username: decoded.username,
      Password: decoded.password,
      Registration_type: decoded.registration_type,
    };
    if (data.Registration_type === undefined) {
      data.Registration_type = "0";
    }
  } catch (e) {
    log(
      JSON.stringify(
        "The POST request is missing Data to login the user : " + e.message
      ),
      "crash.log"
    );
  }
  connection.getConnection(async function (err, connection) {
    if (data.Registration_type == "0") {
      // user creation
      connection.query(
        "SELECT * FROM users WHERE username='" + data.Username + "';",
        function (sql_error, results, fields) {
          // If some error occurs, we throw an error.
          if (sql_error)
            if (!res.headersSent) {
              res.send("false");
            }
          if (results.length > 0) var Stored_pass = results[0].pass;
          // if provided username is in our database
          else {
            if (!res.headersSent) {
              res.send("false");
            } // if not send false
            connection.release();
            return; // and stop the connection.query
          }

          // Stored Password Decryption
          try {
            Stored_pass = aes256.decrypt(
              process.env.REACT_APP_SECRET_KEY,
              Stored_pass
            );
          } catch (e) {
            log(
              JSON.stringify("Stored password fail to decrypt : " + e.message),
              "crash.log"
            );
          }

          // Submit Password Hasing
          try {
            data.Password = sha1(data.Password);
          } catch (e) {
            log(
              JSON.stringify(
                "Submit password fail to be hashed : " + e.message
              ),
              "crash.log"
            );
          }

          if (Stored_pass == data.Password) {
            // if the Submit pass is the same as storage pass
            // store the user_id in session
            req.session.user_id = results[0].id;
            if (!res.headersSent) {
              res.send("true");
            }
            connection.release();
          } else {
            if (!res.headersSent) {
              res.send("false");
            }
            connection.release();
          }
        }
      );
    }
    if (
      data.Registration_type == "1" ||
      data.Registration_type == "2" ||
      data.Registration_type == "3"
    ) {
      connection.query(
        "SELECT id FROM users WHERE username='" + data.Username + "';",
        function (sql_error, results, fields) {
          // If some error occurs, we throw an error.
          try {
            if (sql_error) {
              throw console.error(sql_error);
            }
            // store the user_id in session
            req.session.user_id = results[0].id;
            if (!res.headersSent) {
              res.send("true");
            }
            connection.release();
          } catch (e) {
            if (!res.headersSent) {
              res.send("false");
            }
            connection.release();
            log(JSON.stringify(e), "crash.log");
          }
        }
      );
    }
  });
};

// Checks

exports.Check_Username = function (req, res, connection) {
  var decoded = jwt.verify(
    req.query.jwt_token,
    process.env.REACT_APP_SECRET_KEY
  );
  connection.getConnection(function (err, connection) {
    // Executing SQL query
    connection.query(
      "SELECT EXISTS(SELECT * FROM users WHERE username='" +
        decoded.username +
        "');",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        try {
          if (sql_error) {
            throw console.error(sql_error);
          }
          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          let result_converted = Object.values(results[0]);
          if (!res.headersSent) {
            res.send(JSON.stringify(result_converted[0]));
          }
          connection.release();
        } catch (e) {
          if (!res.headersSent) {
            res.send("false");
          }
          connection.release();
          log(JSON.stringify(e), "crash.log");
        }
      }
    );
  });
};

exports.Check_Email = function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    var decoded = jwt.verify(
      req.query.jwt_token,
      process.env.REACT_APP_SECRET_KEY
    );
    // Executing SQL query
    connection.query(
      "SELECT EXISTS(SELECT * FROM users WHERE mail='" + decoded.email + "');",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        try {
          if (sql_error) {
            throw console.error(sql_error);
          }
          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          let result_converted = Object.values(results[0]);
          if (!res.headersSent) {
            res.send(JSON.stringify(result_converted[0]));
          }
          connection.release();
        } catch (e) {
          if (!res.headersSent) {
            res.send("false");
          }
          connection.release();
          log(JSON.stringify(e), "crash.log");
        }
      }
    );
  });
};

exports.Check_RegistrationType = function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    var decoded = jwt.verify(
      req.query.jwt_token,
      process.env.REACT_APP_SECRET_KEY
    );
    // Executing SQL query
    connection.query(
      "SELECT registration_type FROM users WHERE mail ='" +
        decoded.email +
        "';",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        try {
          if (sql_error) {
            throw console.error(sql_error);
          }
          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          let result_converted = Object.values(results[0]);
          if (!res.headersSent) {
            res.send(JSON.stringify(result_converted[0]));
          }
          connection.release();
        } catch (e) {
          if (!res.headersSent) {
            res.send("false");
          }
          connection.release();
          log(JSON.stringify(e), "crash.log");
        }
      }
    );
  });
};
