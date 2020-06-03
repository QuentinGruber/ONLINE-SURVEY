exports.create_new_form = async function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    // Create form
    connection.query(
      "INSERT INTO forms (users_id,name) VALUES (" +
        "'" +
        req.session.user_id +
        "'" +
        "," +
        "'" +
        req.body.title +
        "'" +
        ");",
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
            "', '" +
            +req.body.content[i].required + // use "+" to change type from boolean to int
              "');",
            function (sql_error, results, fields) {
              // If some error occurs, we throw an error.
              if (sql_error) {
                res.send("false");
                connection.release();
              }

              // Create answer linked to the current question

              if (req.body.content[i].type === "text") {
                connection.query(
                  "INSERT INTO answers ( question_id, text , checked) VALUES ( '" +
                    results.insertId +
                    "', '" +
                    req.body.content[i].p_answer +
                    "','1');",
                  function (sql_error, results, fields) {
                    // If some error occurs, we throw an error.
                    if (sql_error) {
                      res.send("false");
                      connection.release();
                    }
                  }
                );
              }

              if (req.body.content[i].type === "radio") {
                for (let j = 0; j < req.body.content[i].p_answer.length; j++) {
                  connection.query(
                    "INSERT INTO answers ( question_id, text , checked) VALUES ( '" +
                      results.insertId +
                      "', '" +
                      req.body.content[i].p_answer[j].text +
                      "','" +
                      (req.body.content[i].p_answer[j].checked | 0) +
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
              }
            }
          );
        }
      }
    );
    res.send("true");
    connection.release();
  });
};

exports.modify_form = async function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    // updt form name
    connection.query(
      "UPDATE forms SET name='" +
        req.body.title +
        "' WHERE id=" +
        req.body.id +
        ";",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        if (sql_error) {
          res.send("false");
          connection.release();
        }
        for (let i = 0; i < req.body.content.length; i++) {
          if (req.body.content[i].id != undefined) {
            // Create question linked to form
            connection.query(
              "UPDATE questions SET " +
                "text=" +
                "'" +
                req.body.content[i].title +
                "', " +
                "type=" +
                "'" +
                req.body.content[i].type +
                "', " +
                "required=" +
                "'" +
                (req.body.content[i].required | 0) +
                "' WHERE id=" +
                "'" +
                req.body.content[i].id +
                "'" +
                ";",
              function (sql_error, results, fields) {
                // If some error occurs, we throw an error.
                if (sql_error) {
                  res.send("false");
                  connection.release();
                }

                // Create answer linked to the current question

                if (req.body.content[i].type === "text") {
                  connection.query(
                    "UPDATE answers SET " +
                      "text=" +
                      "'" +
                      req.body.content[i].p_answer +
                      "'" +
                      "WHERE id=" +
                      "'" +
                      req.body.content[i].id +
                      "'" +
                      ";",
                    function (sql_error, results, fields) {
                      // If some error occurs, we throw an error.
                      if (sql_error) {
                        res.send("false");
                        connection.release();
                      }
                    }
                  );
                }

                if (req.body.content[i].type === "radio") {
                  for (
                    let j = 0;
                    j < req.body.content[i].p_answer.length;
                    j++
                  ) {
                    if (req.body.content[i].p_answer[j].id != undefined) {
                      connection.query(
                        "UPDATE answers SET " +
                          "text=" +
                          "'" +
                          req.body.content[i].p_answer[j].text +
                          "'," +
                          "checked=" +
                          "'" +
                          (req.body.content[i].p_answer[j].checked | 0) +
                          "'" +
                          "WHERE id=" +
                          "'" +
                          req.body.content[i].id +
                          "'" +
                          ";",
                        function (sql_error, results, fields) {
                          // If some error occurs, we throw an error.
                          if (sql_error) {
                            res.send("false");
                            connection.release();
                          }
                        }
                      );
                    }
                    // if answers isn't already in the db
                    else {
                      connection.query(
                        "INSERT INTO answers ( question_id, text , checked) VALUES ( '" +
                          req.body.content[i].id +
                          "', '" +
                          req.body.content[i].p_answer[j].text +
                          "','1');",
                        function (sql_error, results, fields) {
                          // If some error occurs, we throw an error.
                          if (sql_error) {
                            res.send("false");
                            connection.release();
                          }
                        }
                      );
                    }
                  }
                }
              }
            );
          }
          // if item isn't already in the db
          else {
            connection.query(
              "INSERT INTO questions (forms_id,text,type,required) VALUES (" +
                "'" +
                req.body.id +
                "'" +
                "," +
                "'" +
                req.body.content[i].title +
                "'" +
                "," +
                "'" +
                req.body.content[i].type +
                "'" +
                "," +
                "'" +
                req.body.content[i].required +
                "'" +
                ");",
              function (sql_error, results, fields) {
                // If some error occurs, we throw an error.
                if (sql_error) {
                  res.send("false");
                  connection.release();
                }
                for (let j = 0; j < req.body.content[i].p_answer.length; j++) {
                  connection.query(
                    "INSERT INTO answers ( question_id, text , checked) VALUES ( '" +
                      results.insertId +
                      "', '" +
                      req.body.content[i].p_answer[j].text +
                      "','0');",
                    function (sql_error, results, fields) {
                      // If some error occurs, we throw an error.
                      if (sql_error) {
                        res.send("false");
                        connection.release();
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
    res.send("true");
    connection.release();
  });
};

exports.delete_item = function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    // Create form
    connection.query(
      "DELETE FROM questions WHERE questions.id = " + req.body.id + " ;",
      function (sql_error, results, fields) {
        if (sql_error) {
          res.send("false");
          connection.release();
        }
        res.send("true");
        connection.release();
      }
    );
  });
};
exports.get_form_content = async function (req, res, connection) {
  var Formcontent = { title: "", content: [] };
  var FormID = req.path.substr(req.path.lastIndexOf("/") + 1);
  connection.getConnection(function (err, connection) {
    // Create form
    connection.query(
      "SELECT name  FROM `forms` WHERE id= " + "'" + FormID + "'" + ";",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        if (sql_error) {
          res.send("false");
          connection.release();
        }
        if (results.length == 0) {
          // if form doesn't exist
          res.send("false");
          connection.release();
          return;
        }
        Formcontent.title = results[0].name;
        connection.query(
          "SELECT * FROM `questions` WHERE forms_id= " +
            "'" +
            FormID +
            "'" +
            ";",
          function (sql_error, results, fields) {
            // If some error occurs, we throw an error.
            if (sql_error) {
              res.send("false");
              connection.release();
            }
            for (let i = 0; i < results.length; i++) {
              // create new item
              let item = {};
              item.id = results[i].id;
              item.index = i;
              item.title = results[i].text;
              item.required = results[i].required;
              item.type = results[i].type;
              Formcontent.content.push(item);
            }
            var nb_questions = results.length;
            for (let i = 0; i < nb_questions; i++) {
              connection.query(
                "SELECT * FROM `answers` WHERE `question_id`= " +
                  "'" +
                  results[i].id +
                  "'" +
                  ";",
                function (sql_error, results, fields) {
                  // If some error occurs, we throw an error.
                  if (sql_error) {
                    res.send("false");
                    connection.release();
                  }
                  Formcontent.content[i].p_answer = [];
                  for (let j = 0; j < results.length; j++) {
                    Formcontent.content[i].p_answer.push({
                      id: results[j].id,
                      text: results[j].text,
                      checked: results[j].checked,
                    });
                  }
                  if (i + 1 == nb_questions) {
                    res.send(Formcontent);
                    connection.release();
                  }
                }
              );
            }
          }
        );
      }
    );
  });
};

exports.register_answer = async function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    if (!req.session.user_id) {
      // if not connected
      res.send(false);
      connection.release();
      return;
    }
    // Create form
    for (let i = 0; i < req.body.length; i++) {
      connection.query(
        "INSERT INTO `answers_users` (`id`, `answers_id`, `question_id`, `text`, `user_id`) VALUES (NULL, " +
          req.body[i].answerid +
          ", '" +
          req.body[i].questionid +
          "', '" +
          "" +
          req.body[i].value +
          "" +
          "', '" +
          req.session.user_id +
          "');",
        function (sql_error, results, fields) {
          // If some error occurs, we throw an error.
          if (sql_error) {
            res.send("false");
            connection.release();
          }
          res.send(true);
          connection.release();
        }
      );
    }
  });
};

exports.get_user_form_content = async function (req, res, connection) {
  if (req.session.user_id != undefined) {
    connection.getConnection(function (err, connection) {
      connection.query(
        "SELECT * FROM forms WHERE users_id = " + req.session.user_id + " ;",
        function (sql_error, results, fields) {
          // If some error occurs, we throw an error.
          if (sql_error) {
            res.send("false");
            connection.release();
          }
          res.send(results);
          connection.release();
        }
      );
    });
  } else {
    res.send(false);
  }
};
