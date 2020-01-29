import React from 'react';


var nb_question = 0;
var button_nb = 0;

async function Find_from_token(){
    if (localStorage.getItem("Admin_token")!=null){ // if an Admin_token is defined in the localstorage
        var Promise_pseudo = fetch('http://localhost:3001/GET_Username?Token='+localStorage.getItem("Admin_token")+'',{ method: 'POST'})
        var Pseudo = await Promise_pseudo.then(response => response.json())
        return Pseudo; // retourne le pseudo correspondant
    }
    else if (sessionStorage.getItem("Admin_token")!=null){ // if an Admin_token is defined in the sessionStorage
        var Promise_pseudo = fetch('http://localhost:3001/GET_Username?Token='+sessionStorage.getItem("Admin_token")+'',{ method: 'POST'})
        var Pseudo = await Promise_pseudo.then(response => response.json())
        return Pseudo; // retourne le pseudo correspondant
    }
    else{
        return undefined;
    }  
}

var username = Find_from_token();

async function Get_Admin_token(){
    var Promise_Admin_token = fetch('http://localhost:3001/GET_Token?Pseudo='+username+'',{ method: 'POST'})
    var Admin_token = await Promise_Admin_token.then(response => response.json())
    console.log(Admin_token)
    return Admin_token.Admin_token;
}

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
        <form action="http://localhost:3001/sign_in" method="POST" id="loginBox" target="frame">
            LOGIN SECTION
            
            <input name ="name" placeholder="Username"></input>
            

            
            <input name="password" placeholder="Password"></input>
            

            
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
            <button onClick={Get_Admin_token} type="button">fuck</button>
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
  