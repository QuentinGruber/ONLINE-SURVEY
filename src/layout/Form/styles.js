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

  a {
    color: inherit;
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
    min-width: 500px;
    min-height: 80%;
    width: 50%;
    position: absolute;
    margin-bottom: 50px;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    border-radius: 5px;
  }

  .check-aswered {
    position:absolute;
    height: 50%;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
  }

  .div-form-saved {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    top: 70%;
    font-size: 22px;
  }

  .box-btn-retour {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 33%;
    text-align: center;
    bottom: 20px;
  }
  
  .btn-retour {
    width: 100%;
  }

  /* FORM LIST */


  .form-list-card {
    font-size: 18px;
    overflow-y: auto;
    position: absolute;
    width: 42.5%;
    height: calc(80vh - 80px);
    left: 5%;
    top: 10%;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: 5%;
  }

  .add-form-card {
    position: absolute;
    width: 42.5%;
    height: 80px;
    top: calc(90vh - 80px);
    left: 5%;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  .container-button-new-form {
    margin:auto;
  }

  .button-new-form {
    
    font-size: 16px;
  }

  .form-list-card-form {
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

  .div-answers-share {
    margin-bottom: 50px;
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
    margin-left: 0;
  }

  .icon-gauche {
    display: inline
  }
  .icon-droite {
    display: none
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
    margin-bottom: 5%;
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





  /* ON SMALL SCREENS */
  
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

    .form-list-card {
      top: 90px !important;
      width: 85%;
      left: 50%;
      transform: translateX(-50%);
    }

    .add-form-card {
      
      top: calc(80vh + 10px);
      width: 85%;
      left: 50%;
      transform: translateX(-50%);
    }

    /* STATS */

    .stats-card {
      width: 85%;
      left: 50%;
      top: 95%;
      transform: translateX(-50%);
    }


  }


  /* ON MOBILE */


  @media screen and (max-width: 600px) {


    /* ANSWERS SAVED */

    .card-form-saved {
      min-width: 300px !important;
      width: 95% !important;
      top: 90px !important;
      transform: translate(-50%, 0) !important;
      margin-bottom: 15px;
      padding: 10px;
    }

    .check-aswered {
      height: 70%;
      width: 70%;
      top: 0;
    }

    /* FORM LIST */


    .form-list-card {
      width: 85%;
      left: 50%;
      transform: translateX(-50%);
    }

    .add-form-card {
      width: 85%;
      left: 50%;
      transform: translateX(-50%);
    }

    .div-title-form {
      font-size: 18px;
    }

    .div-answers-share {
      text-align: center;
      margin-bottom: 0;
    }

    .div-edit-form {
      position: relative !important;
      display: block;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 10px;
      text-align: center;
    }

    .div-stats-form {
      position: relative !important;
      display: block;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 10px;
      text-align: center;
    }

    .edit-icon {
      margin-left: 5px;
      margin-right: 0px;
    }

    .icon-gauche {
      display: none
    }
    .icon-droite {
      display: inline
    }


    /* STATS */

    .stats-card {
      width: 85%;
      left: 50%;
      top: 95%;
      transform: translateX(-50%);
    }

    }
`;
