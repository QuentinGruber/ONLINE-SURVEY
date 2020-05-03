import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

.fullCard {
    min-width: 500px !important;
    min-height: 80% !important;
    width: 50% !important;
    position: absolute !important;
    top: 10% !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    padding: 20px;
    border-radius: 5px;
  }

  .form-title {
    width: 100%;
    margin: auto;
    margin-bottom: 15px;
    text-align: center;
    font-size: 25px;
    color: black;
    border: none;
    background: transparent;
  }
  .form-title:focus {
    color: black;
    background: transparent;
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

    
`;
