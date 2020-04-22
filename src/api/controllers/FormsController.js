exports.create_new_form = async function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    // Create form
    connection.query(
      "INSERT INTO forms (name) VALUES (" + "'" + req.body.title + "'" + ");",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        if (sql_error) {
          res.send("false");
          connection.release();
        }
        for (let i = 0; i < req.body.content.length; i++) {
          // Create question linked to form
          connection.query(
            "INSERT INTO questions (forms_id, text, type, required) VALUES ( '" +
              results.insertId +
              "', '" +
              req.body.content[i].title +
              "', '" +
              req.body.content[i].type +
              "', '1');",
            function (sql_error, results, fields) {
              // If some error occurs, we throw an error.
              if (sql_error) {
                res.send("false");
                connection.release();
              }

              // Create answer linked to the current question

              if (req.body.content[i].type === "text") {
                connection.query(
                  "INSERT INTO answers ( question_id, text) VALUES ( '" +
                    results.insertId +
                    "', '" +
                    req.body.content[i].p_answer +
                    "');",
                  function (sql_error, results, fields) {
                    // If some error occurs, we throw an error.
                    if (sql_error) {
                      res.send("false");
                      connection.release();
                    }
                  }
                );
              }

              // Add more type here
            }
          );
        }
      }
    );
    res.send("true");
    connection.release();
  });
};
