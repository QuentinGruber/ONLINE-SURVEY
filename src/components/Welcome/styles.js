import { createGlobalStyle } from "styled-components";
import backgroundImage from "../../assets/img/backgrounds/background-stars.jpg";

export const GlobalStyle = createGlobalStyle`
html, body{ height: 100%;}
body{

  background-image:url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  }
  .whiteDiv {
    position: absolute;
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

  /* SCROLL */


  .pave-scroll {
    position: absolute;
    top: 120%;
  }


`;
