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
            connection.query(
                "INSERT INTO USER VALUES (" + "'" + data.Username + "'" + "," + "'" + data.Email + "'" + "," + "'" + data.Password + "'" + ");"
                , function (sql_error, results, fields) {
                    // If some error occurs, we throw an error.
                    if (sql_error) {
                        res.send("false");
                        connection.release();
                    }

                    // Getting the 'response' from the database and sending it to our route. This is were the data is.
                    res.send("true")
                    connection.release()
                });

        }
        // start by encrypt password
        encrypt_password()
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
            "SELECT Password FROM USER WHERE Username='" + data.Username + "';"
            , function (sql_error, results, fields) {
                // If some error occurs, we throw an error.
                if (sql_error) res.send(false);
                if (results.length > 0) var Stored_pass = results[0].Password; // if provided username is in our database
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
        connection.query("SELECT EXISTS(SELECT * FROM USER WHERE Username='" + decoded.username + "');", function (error, results, fields) {
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
        connection.query("SELECT EXISTS(SELECT * FROM USER WHERE Email='" + decoded.email + "');", function (error, results, fields) {
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