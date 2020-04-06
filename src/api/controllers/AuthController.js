var aes256 = require('aes256'); // for Aes encryption
var sha1 = require('sha1'); // for sha cipher
var jwt = require('jsonwebtoken');



function CreateSession(res, req, connection, username) { // create session for a user
    connection.query(
        "SELECT * FROM `users` WHERE username =" + "'" + username + "'" + ";" // get all data about the user
        , function (sql_error, results, fields) {
            // If some error occurs, we throw an error.
            if (sql_error) {
                res.send("false");
                connection.release();
            }
            // store the data we want in his session
            req.session.fname = results[0].first_name
            req.session.lname = results[0].last_name
            req.session.username = results[0].username
            req.session.email = results[0].mail
            res.send("true")
            connection.release()

        });
}


exports.register = function (req, res, connection) {
    try {
        var decoded = jwt.verify(req.query.jwt_token, process.env.REACT_APP_SECRET_KEY);
        data = { // Fetch data from POST request
            "Username": decoded.username,
            "Email": decoded.email,
            "Password": decoded.password,
            "Registration_type": decoded.registration_type,
            "Lname": decoded.lname,
            "Fname": decoded.fname,
        }
    }
    catch (e) {
        console.error("The POST request is missing Data to register the user : " + e.message)
    }

    connection.getConnection(function (err, connection) {

        function encrypt_password() {
            // Password encryption
            try {
                data.Password = sha1(data.Password);
                data.Password = aes256.encrypt(process.env.REACT_APP_SECRET_KEY, data.Password)
                WriteUserInfo(req, res, connection)
            }
            catch (e) {
                console.error("Password fail to encrypt : " + e.message)
                res.send("false");
            }
        }

        function WriteUserInfo(req, res, connection) {
            // user creation
            if (data.Registration_type == "0") {
                connection.query(
                    "INSERT INTO users (username,mail,pass,registration_type) VALUES (" + "'" + data.Username + "'" + "," + "'" + data.Email +
                    "'" + "," + "'" + data.Password + "'" + "," + "'" + data.Registration_type + "'" + ");"
                    , function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                            res.send("false");
                            connection.release();
                        }

                        // Getting the 'response' from the database and sending it to our route. This is were the data is.
                        CreateSession(res, req, connection, data.Username)
                    });
            }
            if (data.Registration_type == "1") {
                connection.query(
                    "INSERT INTO users (username,first_name,last_name,mail,registration_type) VALUES (" + "'" + data.Username + "'" + ","
                    + "'" + data.Fname + "'" + ","
                    + "'" + data.Lname + "'" + ","
                    + "'" + data.Email + "'" + ","
                    + "'" + data.Registration_type + "'" + ");"
                    , function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                            res.send("false");
                            connection.release();
                        }

                        // Getting the 'response' from the database and sending it to our route. This is were the data is.
                        CreateSession(res, req, connection, data.Username)
                    });
            }
            if (data.Registration_type == "2") {
                connection.query(
                    "INSERT INTO users (username,first_name,last_name,mail,registration_type) VALUES (" + "'" + data.Username + "'" + ","
                    + "'" + data.Fname + "'" + ","
                    + "'" + data.Lname + "'" + ","
                    + "'" + data.Email + "'" + ","
                    + "'" + data.Registration_type + "'" + ");"
                    , function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                            res.send("false");
                            connection.release();
                        }

                        // Getting the 'response' from the database and sending it to our route. This is were the data is.
                        CreateSession(res, req, connection, data.Username)
                    });
            }
            if (data.Registration_type == "3") {
                connection.query(
                    "INSERT INTO users (username,mail,registration_type) VALUES (" + "'" + data.Username + "'" + ","
                    + "'" + data.Email + "'" + ","
                    + "'" + data.Registration_type + "'" + ");"
                    , function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                            res.send("false");
                            connection.release();
                        }

                        // Getting the 'response' from the database and sending it to our route. This is were the data is.
                        CreateSession(res, req, connection, data.Username)
                    });
            }

        }
        // start by encrypt password if standard register
        if (data.Registration_type == "0") {
            encrypt_password()
        }
        else {
            WriteUserInfo(req, res, connection)
        }
    });
}

exports.login = function (req, res, connection) {
    try {
        var decoded = jwt.verify(req.query.jwt_token, process.env.REACT_APP_SECRET_KEY);
        data = { // Fetch data from POST request
            "Username": decoded.username,
            "Password": decoded.password,
            "Registration_type": decoded.registration_type
        }
        if (data.Registration_type === undefined) {
            data.Registration_type = "0";
        }
    }
    catch (e) {
        console.error("The POST request is missing Data to login the user : " + e.message)
    }
    connection.getConnection(async function (err, connection) {
        if (data.Registration_type == "0") {


            // user creation
            connection.query(
                "SELECT pass FROM users WHERE username='" + data.Username + "';"
                , function (sql_error, results, fields) {
                    // If some error occurs, we throw an error.
                    if (sql_error) res.send(false);
                    if (results.length > 0) var Stored_pass = results[0].pass; // if provided username is in our database
                    else {
                        res.send(false); // if not send false
                        connection.release()
                        return; // and stop the connection.query
                    }

                    // Stored Password Decryption
                    try {
                        Stored_pass = aes256.decrypt(process.env.REACT_APP_SECRET_KEY, Stored_pass)
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
                        CreateSession(res, req, connection, data.Username)
                    }
                    else {
                        res.send(false);
                        connection.release()
                    }

                });

        }
        if (data.Registration_type == "1") {
            CreateSession(res, req, connection, data.Username)
        }
        if (data.Registration_type == "2") {
            CreateSession(res, req, connection, data.Username)
        }
        if (data.Registration_type == "3") {
            CreateSession(res, req, connection, data.Username)
        }
    });
}

// Checks

exports.Check_Username = function (req, res, connection) {
    var decoded = jwt.verify(req.query.jwt_token, process.env.REACT_APP_SECRET_KEY);
    connection.getConnection(function (err, connection) {

        // Executing SQL query
        connection.query("SELECT EXISTS(SELECT * FROM users WHERE username='" + decoded.username + "');", function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) {
                console.error(error);
                connection.release()
            }
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            let result_converted = Object.values(results[0])
            res.send(JSON.stringify(result_converted[0]))
            connection.release()
        });
    });
}

exports.Check_Email = function (req, res, connection) {
    connection.getConnection(function (err, connection) {
        var decoded = jwt.verify(req.query.jwt_token, process.env.REACT_APP_SECRET_KEY);
        // Executing SQL query
        connection.query("SELECT EXISTS(SELECT * FROM users WHERE mail='" + decoded.email + "');", function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) {
                console.error(error);
                connection.release()
            }
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            let result_converted = Object.values(results[0])
            res.send(JSON.stringify(result_converted[0]))
            connection.release()
        });
    });
}

exports.Check_RegistrationType = function (req, res, connection) {
    connection.getConnection(function (err, connection) {
        var decoded = jwt.verify(req.query.jwt_token, process.env.REACT_APP_SECRET_KEY);
        // Executing SQL query
        connection.query("SELECT registration_type FROM users WHERE mail ='" + decoded.email + "';", function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) {
                console.error(error);
                connection.release()
            }
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            let result_converted = Object.values(results[0])
            res.send(JSON.stringify(result_converted[0]))
            connection.release()
        });
    });
}