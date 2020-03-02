import React from 'react';

class Register extends React.Component {
    render() {
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
      function Verify_register_info(){
        // Display an error if an required input is not good filled
        var form = document.getElementById("registerBox")
        form.reportValidity()
    
        var isValidUsername = document.getElementById("Register_name").checkValidity();
        var isValidEmail = document.getElementById("Register_email").checkValidity();
        var isValidPassword = document.getElementById("Register_pass").checkValidity();
        var isValidCheckbox = document.getElementById("check_register").checkValidity();
        // If all required input are correctly filled we check if
        // username is already in our DB or not
        if ( isValidUsername && isValidEmail && isValidPassword && isValidCheckbox) {
            Check_Username()
        }
    }
    
    function Check_Username(){
        // Check if Username is not already taken
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() { // handle request response
           if (this.readyState === 4 && this.status === 200) {
               // response format is a rowdatapacket so it was needed to do like that.
               if(Object.values(this.response[Object.values(this.response).length - 3])[0] === "0")
                    // next step check if provided email isn't already in our database
                    Check_Email();
               else
                    alert("Username already taken !");
       }};
       // Send a post request
       xhttp.open("POST", "http://localhost:3001/api/Check_Username?username="+document.getElementById("Register_name").value+"", true);
       xhttp.send(); 
       }
    
       function Check_Email(){
        // Check if provided email is not already in our database
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() { // handle request response
           if (this.readyState === 4 && this.status === 200) {
               // response format is a rowdatapacket so it was needed to do like that.
               if(Object.values(this.response[Object.values(this.response).length - 3])[0] === "0")
                    // information has been checked now we can register the user
                    Register();
               else
                   alert("An account already use this email address ! ");
       }};
       // Send a post request
       xhttp.open("POST", "http://localhost:3001/api/Check_Email?email="+document.getElementById("Register_email").value+"", true);
       xhttp.send(); 
       }
    
    function Register(){
            // get our input values
            var username = document.getElementById("Register_name").value;
            var password = document.getElementById("Register_pass").value;
            var email = document.getElementById("Register_email").value;
            var token = Get_AdminToken(); // get admin_token if user has one
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    if(this.responseText === "true"){
                        alert("Registered succesfully!") 
                        window.location.reload();
                    }
                    else{
                        alert("Fail to register...sorry")
                    }
                }
            };
        // Send a post request
        xhttp.open("POST", "http://localhost:3001/api/sign_up?username="+username+"&password="+password+"&email="+email+"&token="+token+"", true);
        xhttp.send(); 
    }
    
      return (
        <form id="registerBox">
            REGISTER SECTION
            
            <input type = "text" id = "Register_name" name ="username" placeholder="Username" pattern = '.{3,16}' required></input>
            

            
            <input type = "text" id = "Register_email" name ="email" placeholder = "email"  pattern = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' title = "Doit respecter le format d'un email" required></input>
            

            
            <input type = "password" id = "Register_pass" name = "password" placeholder = "Password" pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title = "Doit contenir au moins un chiffre, une minuscule, une majuscule, et 8 caractères" required></input>
            
            
            
            <input type="checkbox" id="check_register" name="checkbox inscription" required></input>
            <label htmlFor="check_register">J'accepte les conditions d'utilisations de Online Survey</label>
            

            
            <input value="SUBMIT" type="button" onClick={Verify_register_info} id="registerSubmitButton" ></input>
        </form>
      )
    }
  }
  export default Register;