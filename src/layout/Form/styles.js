import { createGlobalStyle } from "styled-components";
import backgroundImage from "../../assets/img/backgrounds/background-stars.jpg";
export const GlobalStyle = createGlobalStyle`

/* BACKGROUND */

body{
    background: url(${backgroundImage}) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .whiteDiv {
    position: fixed;
    width: 100%;
    height: 600px;
    top: -400px;
    background: rgba(255,255,255,0);
    z-index: -100;
  }
  
  .whiteDiv:after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    background: inherit;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform-origin: top right;
    transform: skewY(-8deg);
    background: rgba(255,255,255,0.3);
  }
  
  .boxText {
    position: absolute;
    width : 20%;
    right: 3%;
    top : 50%;
    transform: translateY(-50%);
    color: white;
    text-align: center;
    font-size: 20px;
  }
  
  .boxTextTitre {
    font-size: 40px;
  }

  .boxTextFormList {
    position: absolute;
    width : 100%;
    top : 10px;
    height: 75px;
    left: 0;
    color: white;
    text-align: center;
    font-size: 16px;

  }
  
  .boxTextTitreFormList {
    font-size: 32px;
  }


  /* ANSWERS SAVED */

  .card-form-saved {
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

  .check-aswered {
    position:absolute;
    height: 50%;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
  }

  .div-form-saved {

  }


  /* FORM LIST */


  .form-list-card {
    font-size: 18px;
    position: absolute;
    width: 42.5%;
    min-height: 80%;
    left: 5%;
    top: 10%;
  }

  .form-list-card-form {
    min-height: 150px;
    display:inline-block;
    padding: 10px;
    margin: 15px;
  }

  .div-title-form {
    width: 95%;
    font-size: 25px;
    color: black;
  }

  .div-trash-icon {
    display: inline;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .button-delete-form {
    font-size: 1rem;
  }

  .div-answers-form {
    display: inline;
    width: 30%;
  }

  .div-share-form {
    display: inline;
    cursor: pointer;
  }

  .share-icon {
    margin-left : 5px;
  }
  
  .div-share-form:hover {
    color: #32325d;
    text-decoration: underline;
  }

  .div-edit-form {
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
  }

  .edit-icon {
    margin-right : 5px;
  }
  
  .div-edit-form:hover {
    color: #32325d;
    text-decoration: underline;
  }

  .div-stats-form {
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
  }

  .stats-icon {
    margin-left : 5px;
  }
  
  .div-stats-form:hover {
    color: #32325d;
    text-decoration: underline;
  }


  /* STATS */

  .stats-card {
    font-size: 18px;
    position: absolute;
    width: 42.5%;
    min-height: 80%;
    right: 5%;
    top: 10%;
  }

  .placeholder-stats-div{
    font-size: 24px;
    position: absolute;
    text-align: center;
    color: #999;
    width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }





  /* ON MOBILE */
  
  @media screen and (max-width: 1200px) {
  
    /* BACKGROUND */

    .whiteDiv {
      display: none;
    }
    
    .boxText {
      position: absolute;
      width : 100%;
      top : 40px;
      height: 75px;
      left: 0;
      color: white;
      text-align: center;
      font-size: 16px;
    }
  
    .boxTextTitre {
      font-size: 32px;
    }

    /* FORM LIST */


  }

`;
