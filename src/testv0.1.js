import React from 'react';


var nb_question = 0;
var button_nb = 0;

function add_question(){
    /* variables */
    nb_question = nb_question+1

    var new_div = document.createElement("div")
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    var new_input = document.createElement('input');
    var delete_button = document.createElement('button');
    


    /* attributs */ 
    new_div.setAttribute("id", "div_question"+nb_question)

    new_input.setAttribute("placeholder", "Nouvelle question");

    delete_button.setAttribute("type","button")
    delete_button.setAttribute("id", "delete_button"+nb_question);
    delete_button.addEventListener("click", delete_question, false);


    delete_button.innerHTML = "-"

    /* affichages */
    document.getElementById('formBox').appendChild(new_div);
    new_div.appendChild(br1);
    new_div.appendChild(new_input);
    new_div.appendChild(delete_button);
    new_div.appendChild(br2);
}

function delete_question(){
    button_nb = this.id.charAt(this.id.length - 1)
    console.log(button_nb)

    var element = document.getElementById("div_question"+button_nb);
    element.parentNode.removeChild(element);



}





function Test() {
    return (
      <div className="Test">
        <form id="loginBox">
            LOGIN SECTION
            <br></br>
            <input placeholder="email/Username"></input>
            <br></br>

            <br></br>
            <input placeholder="Password"></input>
            <br></br>

            <br></br>
            <button>SUBMIT</button>
        </form>

        <br></br><br></br>

        <form id="registerBox">
            REGISTER SECTION
            <br></br>
            <input placeholder="Username"></input>
            <br></br>

            <br></br>
            <input placeholder="email"></input>
            <br></br>

            <br></br>
            <input placeholder="Password"></input>
            <br></br>
            
            <br></br>
            <input type="checkbox" id="check" name="checkbox inscription"></input>
            <label htmlFor="check">J'accepte les conditions d'utilisations de Online Survey</label>
            <br></br>

            <br></br>
            <button>SUBMIT</button>
        </form>

        <br></br><br></br>

        <form id="formBox">
            FORM SECTION  .

            <button type="button" onClick={add_question}>ajouter question</button>

            <br></br>
            <input placeholder="Nom du formulaire"></input>
            <br></br>
            
        </form>
        <br></br>
        <button type="submit">SUBMIT</button>

      </div>
    );
  }
  
  export default Test;
  