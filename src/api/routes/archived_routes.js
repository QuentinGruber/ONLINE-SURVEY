// TOKEN
app.post('/api/GET_Token', urlencodedParser, function (req, res) {  // ROUTENAME est un exemple

    // Connecting to the database.
    connection.getConnection(function (err, connection) {

        // Executing SQL query
        connection.query("SELECT Token FROM USER WHERE Username='" + req.query.Username + "';", function (error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;

            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            res.send(results)
            connection.release()
        });
    });
});

// Username // used ?
app.post('/api/GET_Username', urlencodedParser, function (req, res) {  // ROUTENAME est un exemple

    // Connecting to the database.
    connection.getConnection(function (err, connection) {

        // Executing SQL query
        connection.query("SELECT Username FROM USER WHERE Token='" + req.query.Token + "';", function (error, results, fields) {
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
});