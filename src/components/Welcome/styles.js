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
    margin-bottom: 25px;
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
  }


`;
