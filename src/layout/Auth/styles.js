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
    width : 20%;
    right: 6%;
    top : 50%;
    transform: translateY(-50%);
    color: white;
    text-align: center;
    font-size: 20px;
  }
  
  .boxTextTitre {
    font-size: 40px;
  }

  .red-border {
    border: 2px #BB0B0B solid !important;
    border-radius: 5px !important;
  }
  
  /* ON MOBILE */
  
  @media screen and (max-width: 600px) {
    .fullCard {
      top: 90px !important;
      transform: translate(-50%, 0) !important;
      margin-bottom: 15px;
    }
  
    .apiButton {
      width: 30%;
    }
  
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
  }
  
  
`;
