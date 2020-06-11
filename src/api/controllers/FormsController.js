const log = require("log-to-file");

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
        try {
          if (sql_error) {
            log(JSON.stringify(sql_error), "crash.log");
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
                  log(JSON.stringify(sql_error), "crash.log");
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
                        log(JSON.stringify(sql_error), "crash.log");
                      }
                    }
                  );
                }

                if (req.body.content[i].type === "number") {
                  connection.query(
                    "INSERT INTO answers ( question_id, text ) VALUES ( '" +
                      results.insertId +
                      "', '" +
                      req.body.content[i].p_answer +
                      "');",
                    function (sql_error, results, fields) {
                      // If some error occurs, we throw an error.
                      if (sql_error) {
                        log(JSON.stringify(sql_error), "crash.log");
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
                    connection.query(
                      "INSERT INTO answers ( question_id, text) VALUES ( '" +
                        results.insertId +
                        "', '" +
                        req.body.content[i].p_answer[j].text +
                        "');",
                      function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                          log(JSON.stringify(sql_error), "crash.log");
                        }
                      }
                    );
                  }
                }

                if (req.body.content[i].type === "checkbox") {
                  for (
                    let j = 0;
                    j < req.body.content[i].p_answer.length;
                    j++
                  ) {
                    connection.query(
                      "INSERT INTO answers ( question_id, text) VALUES ( '" +
                        results.insertId +
                        "', '" +
                        req.body.content[i].p_answer[j].text +
                        "','" +
                        "');",
                      function (sql_error, results, fields) {
                        // If some error occurs, we throw an error.
                        if (sql_error) {
                          log(JSON.stringify(sql_error), "crash.log");
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        } catch (e) {
          log(JSON.stringify(e), "crash.log");
          if (!res.headersSent) {
            res.send("false");
          }
          connection.release();
        }
      }
    );
    if (!res.headersSent) {
      res.send("true");
    }
    connection.release();
  });
};

exports.get_number_of_answers = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    let FormID = req.path.substr(req.path.lastIndexOf("/") + 1);
    var auth_check = await Check_auth(req, connection, FormID);

    if (auth_check) {
      connection.query(
        "SELECT distinct(answers_users.user_id) FROM `answers_users` JOIN `questions` ON answers_users.question_id=questions.id WHERE questions.forms_id = " +
          FormID +
          "",
        function (sql_error, results, fields) {
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
            if (!res.headersSent) {
              res.send(JSON.stringify(results.length));
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
    } else {
      res.sendStatus(401); // Unauthorized
      connection.release();
    }
  });
};

exports.get_question_list = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    let FormID = req.path.substr(req.path.lastIndexOf("/") + 1);
    var auth_check = await Check_auth(req, connection, FormID);

    if (auth_check) {
      connection.query(
        "SELECT * FROM questions WHERE forms_id=" + FormID + ";",
        function (sql_error, results, fields) {
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
            if (!res.headersSent) {
              res.send(results);
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
    } else {
      res.sendStatus(401); // Unauthorized
      connection.release();
    }
  });
};

exports.get_question_info = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    let QuestionID = req.path.substr(req.path.lastIndexOf("/") + 1);

    connection.query(
      "SELECT * FROM questions WHERE id= " + QuestionID + "",
      function (sql_error, results, fields) {
        try {
          if (sql_error) {
            log(JSON.stringify(sql_error), "crash.log");
          }
          if (!res.headersSent) {
            res.send(results[0]);
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

exports.get_question_answers = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    let QuestionID = req.path.substr(req.path.lastIndexOf("/") + 1);

    connection.query(
      "SELECT answers_users.text FROM `answers_users` JOIN `questions` ON answers_users.question_id=questions.id WHERE answers_users.question_id = " +
        QuestionID +
        " ;",
      function (sql_error, results, fields) {
        try {
          if (sql_error) {
            log(JSON.stringify(sql_error), "crash.log");
          }
          if (!res.headersSent) {
            res.send(results);
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

async function Check_auth(req, connection, FormID) {
  return new Promise((resolve, reject) => {
    if (FormID == undefined) {
      resolve(false);
    } else {
      connection.query(
        "SELECT * FROM `forms` WHERE id = " + FormID + "; ",
        function (sql_error, results, fields) {
          try {
            // If some error occurs, we throw an error.
            if (sql_error) {
              resolve(false);
            }
            let UserID;
            if (req.session != undefined) {
              UserID = req.session.user_id;
            }
            if (UserID != undefined && UserID === results[0].users_id) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (e) {
            resolve(false);
            log(JSON.stringify(e), "crash.log");
          }
        }
      );
    }
  });
}

exports.modify_form = async function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    var auth_check = await Check_auth(req, connection, req.body.FormID);

    if (auth_check) {
      // updt form name
      connection.query(
        "UPDATE forms SET name='" +
          req.body.title +
          "' WHERE id=" +
          req.body.FormID +
          ";",
        function (sql_error, results, fields) {
          try {
            // If some error occurs, we throw an error.
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
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
                      log(JSON.stringify(sql_error), "crash.log");
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
                            log(JSON.stringify(sql_error), "crash.log");
                          }
                        }
                      );
                    }

                    if (req.body.content[i].type === "number") {
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
                            log(JSON.stringify(sql_error), "crash.log");
                          }
                        }
                      );
                    }

                    if (req.body.content[i].type === "checkbox") {
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
                              "WHERE id=" +
                              "'" +
                              req.body.content[i].id +
                              "'" +
                              ";",
                            function (sql_error, results, fields) {
                              // If some error occurs, we throw an error.
                              if (sql_error) {
                                log(JSON.stringify(sql_error), "crash.log");
                              }
                            }
                          );
                        }
                        // if answers isn't already in the db
                        else {
                          connection.query(
                            "INSERT INTO answers ( question_id, text) VALUES ( '" +
                              req.body.content[i].id +
                              "', '" +
                              req.body.content[i].p_answer[j].text +
                              "');",
                            function (sql_error, results, fields) {
                              // If some error occurs, we throw an error.
                              if (sql_error) {
                                log(JSON.stringify(sql_error), "crash.log");
                              }
                            }
                          );
                        }
                      }
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
                              "'" +
                              "WHERE id=" +
                              "'" +
                              req.body.content[i].p_answer[j].id +
                              "'" +
                              ";",
                            function (sql_error, results, fields) {
                              // If some error occurs, we throw an error.
                              if (sql_error) {
                                log(JSON.stringify(sql_error), "crash.log");
                              }
                            }
                          );
                        }
                        // if answers isn't already in the db
                        else {
                          connection.query(
                            "INSERT INTO answers ( question_id, text) VALUES ( '" +
                              req.body.content[i].id +
                              "', '" +
                              req.body.content[i].p_answer[j].text +
                              "');",
                            function (sql_error, results, fields) {
                              // If some error occurs, we throw an error.
                              if (sql_error) {
                                log(JSON.stringify(sql_error), "crash.log");
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
                    req.body.FormID +
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
                    (req.body.content[i].required | 0) +
                    "'" +
                    ");",
                  function (sql_error, results, fields) {
                    // If some error occurs, we throw an error.
                    if (sql_error) {
                      log(JSON.stringify(sql_error), "crash.log");
                    }

                    if (req.body.content[i].p_answer.length > 0) {
                      for (
                        let j = 0;
                        j < req.body.content[i].p_answer.length;
                        j++
                      ) {
                        connection.query(
                          "INSERT INTO answers ( question_id, text) VALUES ( '" +
                            results.insertId +
                            "', '" +
                            req.body.content[i].p_answer[j].text +
                            "');",
                          function (sql_error, results, fields) {
                            // If some error occurs, we throw an error.
                            if (sql_error) {
                              log(JSON.stringify(sql_error), "crash.log");
                            }
                          }
                        );
                      }
                    } else {
                      connection.query(
                        "INSERT INTO answers ( question_id, text) VALUES ( '" +
                          results.insertId +
                          "', '" +
                          req.body.content[i].p_answer +
                          "');",
                        function (sql_error, results, fields) {
                          // If some error occurs, we throw an error.
                          if (sql_error) {
                            log(JSON.stringify(sql_error), "crash.log");
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          } catch (e) {
            if (!res.headersSent) {
              res.send("false");
            }
            connection.release();
            log(JSON.stringify(e), "crash.log");
          }
        }
      );
      if (!res.headersSent) {
        res.send("true");
      }
      connection.release();
    } else {
      if (!res.headersSent) {
        res.send(401);
      } // Unauthorized
      connection.release();
    }
  });
};

exports.delete_form = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    var auth_check = await Check_auth(req, connection, req.body.FormID);

    if (auth_check) {
      // Create form
      connection.query(
        "DELETE FROM forms WHERE `id` = " + req.body.FormID + " ;",
        function (sql_error, results, fields) {
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
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
    } else {
      res.sendStatus(401); // Unauthorized
      connection.release();
    }
  });
};

exports.delete_item = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    var auth_check = await Check_auth(req, connection, req.body.FormID);

    if (auth_check) {
      // Create form
      connection.query(
        "DELETE FROM questions WHERE questions.id = " + req.body.id + " ;",
        function (sql_error, results, fields) {
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
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
    } else {
      res.sendStatus(401); // Unauthorized
      connection.release();
    }
  });
};

exports.delete_option = function (req, res, connection) {
  connection.getConnection(async function (err, connection) {
    var auth_check = await Check_auth(req, connection, req.body.FormID);

    if (auth_check) {
      // Create form
      connection.query(
        "DELETE FROM answers WHERE answers.id = " + req.body.id + " ;",
        function (sql_error, results, fields) {
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
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
    } else {
      res.sendStatus(401); // Unauthorized
      connection.release();
    }
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
        try {
          // If some error occurs, we throw an error.
          if (sql_error) {
            log(JSON.stringify(sql_error), "crash.log");
          }
          if (results.length == 0) {
            // if form doesn't exist
            if (!res.headersSent) {
              res.send("false");
            }
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
                log(JSON.stringify(sql_error), "crash.log");
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
                      log(JSON.stringify(sql_error), "crash.log");
                    }
                    Formcontent.content[i].p_answer = [];
                    for (let j = 0; j < results.length; j++) {
                      Formcontent.content[i].p_answer.push({
                        id: results[j].id,
                        text: results[j].text,
                      });
                    }
                    if (i + 1 == nb_questions) {
                      if (!res.headersSent) {
                        res.send(Formcontent);
                      }
                      connection.release();
                    }
                  }
                );
              }
            }
          );
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

exports.HasAnswered = async function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    if (!req.session.user_id) {
      // if not connected
      if (!res.headersSent) {
        res.send(false);
      }
      connection.release();
      return;
    }
    connection.query(
      "SELECT distinct(questions.forms_id) FROM answers_users JOIN questions ON answers_users.question_id=questions.id WHERE answers_users.user_id = " +
        req.session.user_id +
        "",
      function (sql_error, results, fields) {
        // If some error occurs, we throw an error.
        try {
          if (sql_error) {
            log(JSON.stringify(sql_error), "crash.log");
          }

          var FormID = req.path.substr(req.path.lastIndexOf("/") + 1); // get current form id
          let HasAnswered = false;
          results.forEach((element) => {
            // if user has answered the form
            if (element.forms_id === parseInt(FormID)) {
              HasAnswered = true;
              if (!res.headersSent) {
                res.send(true);
              }
              connection.release();
            }
          });
          if (!HasAnswered) {
            // if not
            if (!res.headersSent) {
              res.send(false);
            }
            connection.release();
          }
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

exports.register_answer = async function (req, res, connection) {
  connection.getConnection(function (err, connection) {
    if (!req.session.user_id) {
      // if not connected
      if (!res.headersSent) {
        res.send(false);
      }
      connection.release();
      return;
    }
    // Create form
    for (let i = 0; i < req.body.length; i++) {
      connection.query(
        "INSERT INTO `answers_users` (`answers_id`, `question_id`, `text`, `user_id`) VALUES ('" +
          req.body[i].answerid +
          "'" +
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
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
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
    if (!res.headersSent) {
      res.send(true);
    }
    connection.release();
  });
};

exports.get_user_form_content = async function (req, res, connection) {
  if (req.session.user_id != undefined) {
    connection.getConnection(function (err, connection) {
      connection.query(
        "SELECT * FROM forms WHERE users_id = " + req.session.user_id + " ;",
        function (sql_error, results, fields) {
          // If some error occurs, we throw an error.
          try {
            if (sql_error) {
              log(JSON.stringify(sql_error), "crash.log");
            }
            if (!res.headersSent) {
              res.send(results);
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
  } else {
    if (!res.headersSent) {
      res.send(false);
    }
  }
};
