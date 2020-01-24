import React from 'react';
function add_question(){
    var new_br = document.createElement('br');


/*     var new_imput = document.createElement('imput');
    console.log("1")
    new_imput.setAttribute("placeholder", "Nouvelle question");
    new_imput.style.width = '50px';
    new_imput.style.height = '50px'

    document.getElementById('formBox').appendChild(new_imput);
    console.log("4") */
}





function Test() {
    return (
      <div className="Test">
        <div id="loginBox">
            LOGIN SECTION
            <br></br>
            <input placeholder="email/Username"></input>
            <br></br>

            <br></br>
            <input placeholder="Password"></input>
            <br></br>

            <br></br>
            <button>SUBMIT</button>
        </div>

        <br></br><br></br><br></br><br></br><br></br>

        <div id="registerBox">
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
            <label for="check">J'accepte les conditions d'utilisations de Online Survey</label>
            <br></br>

            <br></br>
            <button>SUBMIT</button>
        </div>

        <br></br><br></br><br></br><br></br><br></br>

        <div id="formBox">
            FORM SECTION
            <br></br>
            <input placeholder="Nom du formulaire"></input>
            <br></br>
            
            <br></br>
            <input placeholder="Question"></input>
            <button onClick={add_question}>+</button>
        </div>


      </div>
    );
  }
  
  export default Test;
  