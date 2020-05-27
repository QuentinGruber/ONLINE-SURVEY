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

  .card-question{
    margin: 5px 0px !important;
    padding: 10px 15px;
    min-height: 100px;
    border-radius: 0.375rem;
  }

  .question { /* titre de la question */
    display: inline-block;
    width: 100%;
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
`;
