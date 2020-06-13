import { createGlobalStyle } from "styled-components";
import backgroundImage from "../../assets/img/backgrounds/background-stars.jpg";
export const GlobalStyle = createGlobalStyle`
body{
  background: url(${backgroundImage}) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
    }
  
  .fullCard {
    min-width: 350px !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, calc(-50% + 0.5px)) !important;
  }
  
  .apiBox {
    display: flex;
    justify-content: space-evenly;
  }
  
  .apiButton {
    width: 130px;
    padding: 10px;
  }
  
  .btn-submit {
    width: 200px;
  }
  
  .text-light {
    font-size: 90%;
  }

  .to-register {
    margin: auto;
  }  

  .to-login {
    margin: auto;
  }


  .whiteDiv {
    position: relative;
    width: 100%;
    height: 600px;
    top: -400px;
    background: rgba(255,255,255,0);
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
    width : 25%;
    right: 6%;
    top : 50%;
    transform: translateY(-50%);
    color: white;
    text-align: center;
    font-size: 20px;
  }
  
  .boxTextTitre {
    font-size:40px;
    height: 66px;
    width: 333px;
    margin: auto;
  }

  .title-logo {
    max-width:100%;
    height:auto;
  }

  .red-border {
    border: 2px #BB0B0B solid !important;
    border-radius: 5px !important;
  }
  



  /* ON SMALL SCREENS */
  
  @media screen and (max-width: 1200px) {

    .whiteDiv {
      display: none;
    }

    .boxText {
      width : 50%;
      left: 50%;
      transform: translateX(-50%) !important;
      top : 25px;
    }


  }





  /* ON MOBILE */
  
  @media screen and (max-width: 600px) {


    .boxText {
      position: absolute;
      width : 90%;
      left: 50%;
      transform: translateX(-50%) !important;
      top : 5px;
    }
    
    .boxTextTitre {
      font-size:40px;
      height: 55px;
      width: 277px;
      margin: auto;
    }

    .title-logo {
      max-width:100%;
      height:auto;
    }

    .boxTextSlogan {
      margin-top: 10px;
      width: 100%;
    }

    .fullCard {
      top: 115px !important;
      transform: translateX(-50%) !important;
      margin-bottom: 15px;
    }
  
    .apiButton {
      width: 30%;
    }
  

  
  
`;
