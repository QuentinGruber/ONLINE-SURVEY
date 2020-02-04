import React from 'react';


var nb_question = 0;
var button_nb = 0;

async function Find_from_token(){ // can be used for displaying the name of the user logged in
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

function add_question(){
    /* variables */
    nb_question += 1
    var new_div

    var new_input = document.createElement('input');
    var delete_button = document.createElement('button');
    

    /* attributs */ 

    new_input.setAttribute("placeholder", "Nouvelle question");
    new_input.setAttribute("name","question"+nb_question)
    new_input.setAttribute("class","question")
    new_input.setAttribute("required","true")
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

function Login(){
    // get our input values
    var name = document.getElementById("Login_name").value;
    var password = document.getElementById("Login_pass").value;
    var Keep_logged = document.getElementById("check_login").checked;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() { // handle request response
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText != "false"){
                localStorage.clear()
                sessionStorage.clear()
                if(Keep_logged){
                    localStorage.setItem("Admin_token",this.responseText) // store user's Admin_token in his local storage 
                    alert("Logged in !");
                }
                else{
                    sessionStorage.setItem("Admin_token",this.responseText) // store user's Admin_token in his session storage 
                    alert("Logged in !");
                }
            }
            else{
                alert("Wrong username/password !");
            }
       }
    };
    // Send a post request
    xhttp.open("POST", "http://localhost:3001/sign_in?name="+name+"&password="+password+"", true);
    xhttp.send(); 

}

function Register(){
    var check_register = document.getElementById("check_register").checked;
    if (check_register){
    // get our input values
    var name = document.getElementById("Register_name").value;
    var password = document.getElementById("Register_pass").value;
    var email = document.getElementById("Register_email").value;
    var token = Get_AdminToken(); // get admin_token if user has one
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() { // handle request response
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "true"){
                alert("Registered succesfully!") 
            }
            else{
                alert("Fail to register...sorry")
            }
       }
    };
    // Send a post request
    xhttp.open("POST", "http://localhost:3001/sign_up?name="+name+"&password="+password+"&email="+email+"&token="+token+"", true);
    xhttp.send(); 
}
else{
    alert("Vous devez accepter les conditions d'utilisations de Online Survey ! ") // TODO: to change 
}

}

function Get_AdminToken(){
    // Check if user has an admin token
    var Admin_token
    if (localStorage.getItem("Admin_token")!=null){ // if an Admin_token is defined in the localstorage
        Admin_token = localStorage.getItem("Admin_token")
        return Admin_token; 
    }
    else if (sessionStorage.getItem("Admin_token")!=null){ // if an Admin_token is defined in the sessionStorage
        Admin_token = sessionStorage.getItem("Admin_token")
        return Admin_token; 
    }
    else{ // If not create one
        var randtoken = require('rand-token'); // for random token generation
        Admin_token = randtoken.generate(16)
        localStorage.setItem("Admin_token",Admin_token) // save it 
        return Admin_token; 
    }  
}

function Organize_Content(Content){
    const stringifyObject = require('stringify-object'); // used for stringify object
    var Og_Content = [] // create our content list
    var nb_question = 0;
    Object.values(Content).forEach(element => { // for each question
        nb_question++;
        var Question = { // get info needed
            ['Question'+nb_question]:[{
            value:element.value,
            required:element.required,
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

async function Submit_new_form(){
     // get our input values
     var Admin_token =  Get_AdminToken();
     var Form_name = document.getElementById("input_name_form").value;
     var Content = document.forms["formBox"].getElementsByClassName("question");
     Content = Organize_Content(Content)
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() { // handle request response
         if (this.readyState == 4 && this.status == 200) {
             
                if(this.responseText == "true"){
                    alert("Succesfully create a new form !")
                }
                else{
                    alert("Error when creating new form !")
                }
         }
     };
     // Send a post request
     xhttp.open("POST", "http://localhost:3001/new_form?Admin_token="+Admin_token+"&Form_name="+Form_name+"&Content="+Content+"", true);
     xhttp.send(); 
 

}



function Disconnect(){ // not used right now
    // TODO: reload page
    localStorage.clear() // delete admin token
}

function Test() {
    return (
      <div className="Test">
        <form id="loginBox">
            LOGIN SECTION
            
            <input id = "Login_name" name ="name" placeholder="Username"></input>
            

            
            <input id ="Login_pass" name="password" placeholder="Password"></input>
            

            
            <input type="checkbox" id="check_login" name="checkbox rester connecté"></input>
            <label htmlFor="check_login">Rester connecté</label>

            
            <button onClick = {Login} type="button">SUBMIT</button>
        </form>
        
        {/* TODO: supprimer br */}
        
        <br></br>  

        


        <form id="registerBox">
            REGISTER SECTION
            
            <input id = "Register_name" name ="name" placeholder="Username"></input>
            

            
            <input id = "Register_email" name ="email" placeholder="email"></input>
            

            
            <input id = "Register_pass" name ="password" placeholder="Password"></input>
            
            
            
            <input type="checkbox" id="check_register" name="checkbox inscription"></input>
            <label htmlFor="check_register">J'accepte les conditions d'utilisations de Online Survey</label>
            

            
            <button onClick={Register} >SUBMIT</button>
        </form>

        {/* TODO: supprimer br */}
        
        <br></br>

        <form id="formBox" >
            FORM SECTION  .

            <button type="button" onClick={add_question}>ajouter question</button>

            
            <input name="form_name" placeholder="Nom du formulaire" id="input_name_form"></input>
            
            
            <button id="submitForm" type="button" onClick={Submit_new_form}>SUBMIT</button>
        </form>
      </div>
    );
  }
  
  export default Test;
  