import { createGlobalStyle } from "styled-components";
import backgroundImage from "../../assets/img/backgrounds/background-stars.jpg";

export const GlobalStyle = createGlobalStyle`
  body{
    height: 200vh;
    background: url(${backgroundImage}) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    overflow: scroll;
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
    width : 40%;
    right: 3%;
    top : 50%;
    transform: translateY(-50%);
    color: white;
    text-align: center;
    font-size: 20px;
  }
  
  .boxTextTitre {
    font-size:64px;
    height: 66px;
    width: 333px;
    margin: auto;
  }

  .title-logo {
    max-width:100%;
    height:auto;
  }

  .boxTextSlogan {
    margin-top: 30px;
  }

  .boxTextFormList {
    position: absolute;
    width : 100%;
    top : 10px;
    height: 75px;
    left: 0;
    color: white;
    text-align: center;
    font-size: 32px;
  }
  
  .boxTextTitreFormList {
    font-size: 32px;
  }

  .div-buttons {
    position: relative;
    margin-top: 25px;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    transform: translateY(0.5px);
  }



  .btn {
    font-size: 1.25rem;
    padding: 0.8rem 1.5rem;
    border-color: white;
    color: white;
  }
  .btn:hover {
    background-color: rgba(0,0,0,0);
    border-color: white;
    color: white;
  }
  .btn:active {
    background-color: rgba(0,0,0,0) !important;
    border-color: white !important;
    color: white !important;
  }  









  /* SCROLL */
  body::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent; /* Chrome/Safari/Webkit */
  }

  body {
    overflow-x: hidden;/* Firefox */
    overflow-y: auto;/* Firefox */
    scrollbar-color: transparent transparent;/* Firefox */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
  }

  .div-scroll-down {
    position: absolute;
    cursor: pointer;
    font-size: 1.125rem;
    color: white;
    padding: 15px 5px 25px 5px;
    bottom: 0;
    left: 50%;  
    transform: translateX(-50%);
    border-top: 3px solid white;
    transition: 0.2s;
    visibility: visible;
  }
  .div-scroll-down:hover {
    transform: translate(-50%,15%);
  }

  .div-scroll-down-icon{
    margin:auto;
    margin-top: 10px;
    text-align: center;
  }
  .scroll-down-icon {
    font-size: 1.5rem;
  }


  .div-scroll-up {
    position: absolute;
    cursor: pointer;
    font-size: 1.125rem;
    color: white;
    padding: 25px 5px 15px 5px; 
    top: 100%;
    left: 50%;  
    transform: translateX(-50%);
    border-bottom: 3px solid white;
    transition: 0.2s;
    visibility: visible;
  }
  .div-scroll-up:hover {
    transform: translate(-50%,-15%);
  }

  .div-scroll-up-icon{
    margin:auto;
    margin-top: 10px;
    text-align: center;
  }
  .scroll-up-icon {
    font-size: 1.5rem;
  }






  .pave-scroll {
    position: absolute;
    top: 120%;
    height: 60%;
    width: 100%;
    padding: 0 100px;
  }

  .container-logo {
    position: absolute;
    width: 512px;
    height: 512px;
  }

  .logo {
    max-width:100%;
    height:auto;
  }

  .container-text {
    position: absolute;
    width: calc(100vw - 532px);
    text-align: justify;
    padding: 0 160px 0 160px;
    right: 0;
    color: #ddd;
  }

  .slogan {
    font-size: 32px;
    margin-bottom: 20px;
  }

  p {
    font-size : 18px;
  }

  .footer-2{
    position: absolute;
    bottom: calc(-100% - 50px);
    height: 50px;
    width: 100%;
    text-align: center;
    padding: 50px;
    background-color: none;
    color: white;
  }

  .space{
   width: 50%; 
   display: flex;
   justify-content: space-between;
   margin: auto;
   margin-bottom: 30px;
  }

  a{
    color: white;
  }
  a:hover{
    color: #3C9C8D;
  }



  @media screen and (max-width: 1300px) {
    .pave-scroll {
      padding: 0 50px;
    }    
    .container-text {
      padding: 0 40px 0 80px;
    }
  }



  /* ON SMALL SCREENS */

  @media screen and (max-width: 1200px) {


    .pave-scroll {
      position: absolute;
      top: 115%;
      height: 60%;
      width: 100%;
      padding: 0 50px;
    }

    .container-logo {
      position: relative;
      margin: auto;
      width: 256px;
      height: 256px;
    }


    .container-text {
      position: relative;
      width: 100%;
      padding: 0 80px 0 80px;
    }

    .slogan {
      font-size: 26px;
      margin-bottom: 15px;
    }
  
    p {
      font-size : 16px;
    }
  }

  @media screen and (max-width: 900px) {
    .footer-2 {
      display: none;
    }
  }



  /* ON MOBILE */

  @media screen and (max-width: 600px) {
  
    .boxTextTitre {
      font-size:64px;
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
    }


    .pave-scroll {
      padding: 0;
    }

    .container-logo {
      margin-top: 0;
    }

    .whiteDiv {
      display: none;
    }
    
    .boxText {
      position: absolute;
      width : 100%;
      top : 100px;
      height: 75px;
      left: 0;
      color: white;
      text-align: center;
      font-size: 20px;
    }
  
    .boxTextTitre {
      font-size: 40px;
    }

    .div-buttons {
      margin-top: 100px;
    }

    .container-text {
      margin-top: 50px;
      padding: 25px;
    }

`;
