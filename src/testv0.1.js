import React from 'react';


var nb_question = 0;
var button_nb = 0;

function add_question(){
    /* variables */
    nb_question += 1
    var new_div

    var new_input = document.createElement('input');
    var delete_button = document.createElement('button');
    

    /* attributs */ 

    new_input.setAttribute("placeholder", "Nouvelle question");
    new_input.setAttribute("name","question"+nb_question)

    delete_button.setAttribute("type","button")
    delete_button.setAttribute("id", "delete_button"+nb_question);
    delete_button.addEventListener("click", delete_question, false);
    delete_button.innerHTML = "-"

    /* affichages */
    document.getElementById("submitForm").insertAdjacentHTML("beforebegin",`<div id='div_question${nb_question}'></div>`);
    new_div = document.getElementById("div_question"+nb_question)
    new_div.appendChild(new_input);
    new_div.appendChild(delete_button);


}

function delete_question(){     
    button_nb = this.id.replace( /^\D+/g, ''); /* keep only the number */

    var element = document.getElementById("div_question"+button_nb);
    element.parentNode.removeChild(element);
}

function Test() {
    return (
      <div className="Test">
        <form id="loginBox">
            LOGIN SECTION
            
            <input placeholder="email/Username"></input>
            

            
            <input placeholder="Password"></input>
            

            
            <input type="checkbox" id="check_login" name="checkbox rester connecté"></input>
            <label htmlFor="check_login">Rester connecté</label>

            
            <button>SUBMIT</button>
        </form>
        
        {/* TODO: supprimer br */}
        
        <br></br>  

        


        <form action="http://localhost:3001/sign_up" method="POST" id="registerBox" target="frame">
            REGISTER SECTION
            
            <input name ="name" placeholder="Username"></input>
            

            
            <input name ="email" placeholder="email"></input>
            

            
            <input name ="password" placeholder="Password"></input>
            
            
            
            <input type="checkbox" id="check_register" name="checkbox inscription"></input>
            <label htmlFor="check_register">J'accepte les conditions d'utilisations de Online Survey</label>
            

            
            <button>SUBMIT</button>
        </form>

        {/* TODO: supprimer br */}
        
        <br></br>

        <form id="formBox">
            FORM SECTION  .

            <button type="button" onClick={add_question}>ajouter question</button>

            
            <input placeholder="Nom du formulaire" id="input_name_form"></input>
            
            
            <button type="submit" id="submitForm">SUBMIT</button>
        </form>
        <iframe name="frame"></iframe> {/* solution temporaire pour empecher le reload de la page au lancement d'une requête post*/}
      </div>
    );
  }
  
  export default Test;
  