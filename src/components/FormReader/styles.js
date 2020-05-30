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
    margin: 10px 0px !important;
    padding: 10px 15px;
    min-height: 100px;
    border-radius: 0.375rem;
  }

  .question-required {
    border: 1px #32325d solid; 
  }
  
  .question-not-required {
  }
  
  .question { /* titre de la question */
    display: inline-block;
    width: 100%;
    padding: 5px 0px;
    margin-bottom: 10px;
    font-weight: 549;
    font-size: 20px;
    color: black;
    outline: 0;
    border-width: 0 0 2px;
    border-radius: 0 !important;
    background: transparent;
  }

  .text-input {
    display: inline-block;
    width: calc(100%);
    margin-bottom: 10px;
    border: 1px solid #999;
    color: black;
    outline: 0;
    border-width: 0 0 1px;
    border-radius: 0 !important;
    border-color: #cad1d7;
    background: transparent;
  }

  .radio-answer {
    margin-bottom: 15px;
  }

  .radio-label {
    padding-left: 10px !important;
    font-size: 16px !important;
  }

  .checkbox-type-checkbox,
  .radio-type-radio {
    --active: #32325d;
    --active-inner: #fff;
    --focus: 2px rgba(50, 50, 93, .3);
    --border: #32325d;
    --border-hover: #32325d;
    --background: #fff;
    --disabled: #fff;
    --disabled-inner: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 2px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background .3s, border-color .3s, box-shadow .2s;
    &:after {
      content: '';
      display: block;
      left: -1px;
      top: -1px;
      position: absolute;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: .9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
    &.switch {
      width: 38px;
      border-radius: 11px;
      &:after {
        left: 2px;
        top: 2px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }
      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }
      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: .6;
          }
        }
      }
    }
  }
  .radio-type-radio {
    border-radius: 50%;
    &:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, .7));
    }
    &:checked {
      --s: .5;
    }
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


`;
