import React from 'react';

class FormCreator extends React.Component {
  render() {
    function Get_AdminToken() {
      // Check if user has an admin token
      var Admin_token
      if (localStorage.getItem("Admin_token") != null) { // if an Admin_token is defined in the localstorage
        Admin_token = localStorage.getItem("Admin_token")
        return Admin_token;
      }
      else if (sessionStorage.getItem("Admin_token") != null) { // if an Admin_token is defined in the sessionStorage
        Admin_token = sessionStorage.getItem("Admin_token")
        return Admin_token;
      }
      else { // If not create one
        var randtoken = require('rand-token'); // for random token generation
        Admin_token = randtoken.generate(16)
        localStorage.setItem("Admin_token", Admin_token) // save it 
        return Admin_token;
      }
    }

    function Organize_Content(Content) {
      const stringifyObject = require('stringify-object'); // used for stringify object
      var Og_Content = [] // create our content list
      var nb_question = 0;
      Object.values(Content).forEach(element => { // for each question
        nb_question++;
        var Question = { // get info needed
          ['Question' + nb_question]: [{
            value: element.value,
            required: element.required,
          }]
        }
        Question = stringifyObject(Question, { // stringify our info
          indent: '',
          singleQuotes: true
        });
        Og_Content.push(Question) // add the question to our content list
      });
      return Og_Content
    }

    function count_questions() {
      var liste_question = document.forms["formBox"].getElementsByClassName("question");
      var nb_questions = liste_question.length
      return nb_questions
    }


    function add_question() {
      //variables
      var nb_new_question = count_questions() + 1 // number of the new question created in the following function

      var new_div
      var new_input = document.createElement('input');
      var delete_button = document.createElement('button');

      //attributs

      new_input.setAttribute("placeholder", "Nouvelle question"); // attributes for the <input> element
      new_input.setAttribute("name", "question" + nb_new_question)
      new_input.setAttribute("id", "question" + nb_new_question)
      new_input.setAttribute("class", "question")
      new_input.setAttribute("required", "true")

      delete_button.setAttribute("type", "button")
      delete_button.setAttribute("id", "delete_button" + nb_new_question); // attributes for the  delete <button> element
      delete_button.addEventListener("click", delete_question, false);
      delete_button.innerHTML = "-"

      //affichages
      document.getElementById("submitForm").insertAdjacentHTML("beforebegin", `<div id='div_question${nb_new_question}'></div>`); // insert div before submit button
      new_div = document.getElementById("div_question" + nb_new_question)
      new_div.appendChild(new_input);
      new_div.appendChild(delete_button); //insert everything in the div

    }

    function delete_question() {
      var nb_questions = count_questions()
      var button_nb = 0;
      var div_to_rename = 0;
      var question_to_rename = 0;
      var button_to_rename = 0;

      button_nb = this.id.replace(/^\D+/g, ''); // keep only the number 

      for (var id_to_replace = parseInt(button_nb) + 1; id_to_replace <= nb_questions; id_to_replace++) { //for each line after the deleted one
        div_to_rename = document.getElementById("div_question" + id_to_replace);
        div_to_rename.id = ("div_question" + (id_to_replace - 1))   //replace the div id

        button_to_rename = document.getElementById("delete_button" + id_to_replace);
        button_to_rename.id = ("delete_button" + (id_to_replace - 1))   //replace the button id

        question_to_rename = document.getElementById("question" + id_to_replace);
        question_to_rename.id = ("question" + (id_to_replace - 1))
        question_to_rename.name = ("question" + (id_to_replace - 1)) //replace the question name and id
      }

      var element = document.getElementById("div_question" + button_nb);
      element.parentNode.removeChild(element);

    }

    async function Submit_new_form() {
      // get our input values
      var Admin_token = Get_AdminToken();
      var Form_name = document.getElementById("input_name_form").value;
      var Content = document.forms["formBox"].getElementsByClassName("question");
      Content = Organize_Content(Content)
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () { // handle request response
        if (this.readyState === 4 && this.status === 200) {

          if (this.responseText === "true") {
            alert("Succesfully create a new form !")
          }
          else {
            alert("Error when creating new form !")
          }
        }
      };
      // Send a post request
      xhttp.open("POST", "http://localhost:3001/api/new_form?Admin_token=" + Admin_token + "&Form_name=" + Form_name + "&Content=" + Content + "", true);
      xhttp.send();


    }
    return (
      <form id="formBox" >
        FORM SECTION  .

        <button type="button" onClick={add_question}>ajouter question</button>


        <input name="form_name" placeholder="Nom du formulaire" id="input_name_form"></input>


        <button id="submitForm" type="button" onClick={Submit_new_form}>SUBMIT</button>
      </form>
    )
  }
}
export default FormCreator;