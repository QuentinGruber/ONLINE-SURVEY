import React from 'react';

class Login extends React.Component {
    
    render() {
        function Login(){
            // get our input values
            var username = document.getElementById("Login_name").value;
            var password = document.getElementById("Login_pass").value;
            var Keep_logged = document.getElementById("check_login").checked;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    if(this.responseText !== "false"){
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
            xhttp.open("POST", "http://localhost:3001/api/sign_in?username="+username+"&password="+password+"", true);
            xhttp.send(); 
        
        }
      return(
        <form id="loginBox">
        LOGIN SECTION
        
        <input id = "Login_name" name ="username" placeholder="Username"></input>
        

        
        <input type="password" id ="Login_pass" name="password" placeholder="Password"></input>
        

        
        <input type="checkbox" id="check_login" name="checkbox rester connecté"></input>
        <label htmlFor="check_login">Rester connecté</label>

        
        <button onClick = {Login} type="button">SUBMIT</button>
        </form>

        
      );
    }
  }
  export default Login;