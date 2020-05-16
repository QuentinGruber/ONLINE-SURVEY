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
    padding: 5px 15px;
  }

  .question { /* titre de la question */
    display: inline-block;
    width: calc(100% - 150px);
    padding: 5px 0px;
    font-weight: 549;
    font-size: 18px;
    color: black;
    border: none;
    background: transparent;
  }
  .question:focus {
    color: black;
    background: transparent;
  }

  .type-select {
    right: 0;
    top: 0px;
    display: inline-block;
    width: 130px;
    margin-left: 10px;
  }

  .radio-answer-input {
    min-width: 300px;
    max-width: 90%;
    padding: 5px;
    margin: 5px 10px;
    border: 1px solid #999;
    border-radius: 3px;
    color: black;
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
