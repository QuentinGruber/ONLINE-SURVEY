var aes256 = require('aes256'); // for Aes encryption
var sha1 = require('sha1'); // for sha cipher
var jwt = require('jsonwebtoken');

exports.register = function (req, res, connection) {
    try {
        var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
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
                data.Password = aes256.encrypt(MariaDB_config.PUB_key, data.Password)
                WriteUserInfo(connection)
            }
            catch (e) {
                console.error("Password fail to encrypt : " + e.message)
                res.send("false");
            }
        }

        function WriteUserInfo(connection) {
            // user creation
            if (data.Registration_type == "0"){
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
                    req.session.email = data.Email
                    res.send("true")
                    connection.release()
                });
            }
            if (data.Registration_type == "1") {
                connection.query(
                    "INSERT INTO users (username,first_name,last_name,mail,registration_type) VALUES (" + "'" + data.Username + "'" + ","
                     + "'" + data.Fname +"'" + ","
                     + "'" + data.Lname +"'" + ","
                     + "'" + data.Email +"'" + ","
                     + "'" + data.Registration_type + "'" + ");"
                    , function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                            res.send("false");
                            connection.release();
                        }
    
                        // Getting the 'response' from the database and sending it to our route. This is were the data is.
                        req.session.email = data.Email
                        res.send("true")
                        connection.release()
                    });
            }

        }
        // start by encrypt password if standard register
        if (data.Registration_type == "0") {
            encrypt_password()
        }
        else {
            WriteUserInfo(connection)
        }
    });
}

exports.login = function (req, res, connection) {
    try {
        var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
        data = { // Fetch data from POST request
            "Username": decoded.username,
            "Password": decoded.password,
        }
    }
    catch (e) {
        console.error("The POST request is missing Data to login the user : " + e.message)
    }

    connection.getConnection(async function (err, connection) {

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
                    req.session.email = data.Username
                    res.send(true)
                }
                else {
                    res.send(false);
                    connection.release()
                }

            });

    });
}

// Checks

exports.Check_Username = function (req, res, connection) {
    var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
    connection.getConnection(function (err, connection) {

        // Executing SQL query
        connection.query("SELECT EXISTS(SELECT * FROM users WHERE username='" + decoded.username + "');", function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) {
                console.error(error);
                connection.release()
            }
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            res.send(results)
            connection.release()
        });
    });
}

exports.Check_Email = function (req, res, connection) {
    connection.getConnection(function (err, connection) {
        var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
        // Executing SQL query
        connection.query("SELECT EXISTS(SELECT * FROM users WHERE mail='" + decoded.email + "');", function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) {
                console.error(error);
                connection.release()
            }
            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            res.send(results)
            connection.release()
        });
    });
}