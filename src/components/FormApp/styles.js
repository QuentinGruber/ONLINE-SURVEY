import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

.fullCard {
    min-width: 500px !important;
    min-height: 80% !important;
    width: 50% !important;
    position: absolute !important;
    margin-bottom: 50px;
    top: 10% !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    padding: 20px;
    border-radius: 5px;
  }

  .form-title {
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: black;
    border: none;
    background: transparent;
  }

  .form-title:empty:not(:focus):before{
    color: #999;
    content:attr(data-placeholder);
  }


  .card-question{
    margin: 5px 0px !important;
    padding: 10px 15px;
    min-height: 100px;
  }

  .question { /* titre de la question */
    display: inline-block;
    width: calc(100% - 150px);
    padding: 5px 0px;
    margin-bottom: 20px;
    font-weight: 549;
    font-size: 18px;
    color: black;
    outline: 0;
    border-width: 0 0 2px;
    border-radius: 0 !important;
    background: transparent;
  }
  .question:focus {
    color: black;
    background: transparent;
  }

  .type-select {
    right: 0;
    top: 0;
    display: inline-block;
    width: 130px;
    margin-left: 10px;
  }

  .text-answer-input {
    width: calc(100% - 150px);
  }

  .text-answer-input:focus {
    border-color: #cad1d7;
  }

  .radio-answer-input {
    display: inline-block;
    width: calc(100% - 150px);
    padding: 5px;
    margin: 5px 10px;
    border: 1px solid #999;
    color: black;
    outline: 0;
    border-width: 0 0 1px;
    border-radius: 0 !important;
    border-color: #cad1d7;
    background: transparent;
  }
  
  .radio-answer-input:empty:not(:focus):before{
    color: #999;
    content:attr(data-placeholder);
  }

.delete-question {
  position: absolute;
  top: 2px;
  right: 2px;
}

.box-required {
  position: absolute;
  height: 0;
  right: 10px;
  bottom: 40px;
}

.text-required {
  display:inline-block;
  user-select: none; 
  padding: 0px 10px 50px 0px;
  height: 0 !important;
}

.custom-toggle {
  display: inline-block;
  top: 6px;
}


.card-bottom {
  position: absolute;
  width: 33%;
  bottom: 15px;;
  left: 50%;
  transform: translateX(-50%);
}
.SaveFormButton {
  width: 100%;
  color: white; 
}

/* ON SMALL SCREENS */

@media screen and (max-width: 1200px) {

  .fullCard {
    min-width: 300px !important;
    width: 90% !important;
    top: 90px !important;
    transform: translate(-50%, 0) !important;
    margin-bottom: 15px;
    padding: 10px
  }



  /* ON MOBILE */

@media screen and (max-width: 600px) {

  .fullCard {
    min-width: 300px !important;
    width: 95% !important;
    top: 90px !important;
    transform: translate(-50%, 0) !important;
    margin-bottom: 15px;
    padding: 10px
  }

  .question { /* titre de la question */
    width: 95%;
  }
`;
