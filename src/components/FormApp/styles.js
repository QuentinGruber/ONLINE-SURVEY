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

  .card-top {
    position: relative;
    width: 100%;
    display: flex;
  }

  .form-title {
    position: relative;
    display: block;
    width: calc(100% - 5px);
    text-align: center;
    font-size: 25px;
    color: black;
    border: none;
    background: transparent;
    float: right;
    margin-left: 15px;


  }

  .form-title:empty:before{
    color: #999;
    content:attr(data-placeholder);
  }

  .btn-retour-icone {
    position: relative;
    display: inline;
    font-size: 20px;
    border-color: #172b4d;
    color: #172b4d;
    padding: 5px 15px;
    left: 0;
    width: 50px;
  }

  .btn-retour-icone:hover {
    background-color: rgba(0,0,0,0);
    border-color: #172b4d;
    color: #172b4d;
  }
  .btn-disconnect:active {
    background-color: rgba(0,0,0,0) !important;
    border-color: #172b4d !important;
    color: #172b4d !important;
  }

  .red-border {
    border: 2px #BB0B0B solid !important;
    border-radius: 10px !important;
  }


  .card-question{
    margin: 5px 0px !important;
    padding: 10px 15px;
    min-height: 100px;
  }

  .question { /* titre de la question */
    display: inline-block;
    width: calc(100% - 185px);
    padding: 5px 0px;
    margin-bottom: 10px;
    font-weight: 549;
    font-size: 18px;
    color: black;
    outline: 0;
    border-width: 0 0 2px;
    border-radius: 0 !important;
    background: transparent;
  }
  .question:focus {
    border-color: #172b4d;
    color: black;
    background: transparent;
  }

  .type-select {
    right: 0;
    top: 0;
    display: inline-block;
    width: 175px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .text-answer-input {
    width:100%;
    border-color: #172b4d;
    margin-top: 5px;
  }

  .text-answer-input:focus {
    border-color: #172b4d;
  }

  .radio-answer-input {
    display: inline-block;
    width: calc(100% - 100px);
    padding: 5px;
    margin: 5px 10px;
    border: 1px solid #999;
    color: black;
    outline: 0;
    border-width: 0 0 1px;
    border-radius: 0 !important;
    border-color: #cad1d7;
    background: transparent;
  }
  
  .radio-answer-input:empty:before{
    color: #999;
    content:attr(data-placeholder);
  }
  
  .radio-answer-input:focus {
    border-color: #172b4d;
  }




  .remove-option {
    display: inline-block;
    position: relative;
    margin-top: 5px;
    width: 31px;
    height: 31px;
    opacity: 0.5;
    padding: 3px;
  }
  .remove-option:hover {
    opacity: 1;
  }
  .remove-option:before, .remove-option:after {
    position: absolute;
    content: ' ';
    height: 20px;
    width: 2px;
    left: 13px;
    top: 5px;
    background-color: #172b4d;
  }
  .remove-option:before {
    transform: rotate(45deg);
  }
  .remove-option:after {
    transform: rotate(-45deg);
  }



  .checkbox-type-checkbox,
  .radio-type-radio {
    --active: #275EFE;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, .3);
    --border: #172b4d;
    --border-hover: #275EFE;
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
    margin: 10px 10px 0px 5px;
    cursor: pointer;
    border: 2px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background .3s, border-color .3s, box-shadow .2s;
    &:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
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
      cursor: default;
      opacity: .9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
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
  .checkbox-type-checkbox {
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

  .button-add-option {
    margin-left: 4%;
    margin-top: 5px;
  }



.question-footer {
  bottom: 0px;
  height: 33px;
  width: 100%;
  border: 1px solid #cad1d7;
  margin-top: 15px;

  border-width: 1px 0 0;
  border-radius: 0 !important;
  border-color: #cad1d7;

}


.box-delete-question {
  position: absolute;
  height: 0;
  right: 175px;
  width: 10px;
  bottom: 35px;
  color: #172b4d !important;
}

.box-required {
  position: absolute;
  height: 0;
  right: 10px;
  bottom: 40px;
}

.text-required {
  display:inline-block;
  user-select: none; 
  padding: 0px 10px 50px 0px;
  height: 0 !important;
}

.custom-toggle {
  display: inline-block;
  top: 6px;
}

.custom-toggle-slider {
  transition: .2s;
}

.button-add {
  margin-bottom: 60px;
}

.card-bottom {
  position: absolute;
  width: 175px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}

.save-form-button {
  width: 100%;
}

.green-bg {
  background-color: #088008;
  border-color: #088008;
}
.green-bg:active {
  background-color: #066006 !important;
  border-color: #066006 !important;
}
.green-bg:hover {
  background-color: #088008;
  border-color: #088008;
}

.red-bg {
  background-color: #BB0B0B;
  border-color: #BB0B0B;
}
.red-bg:active {
  background-color: #990909 !important;
  border-color: #990909 !important;
}
.red-bg:hover {
  background-color: #BB0B0B;
  border-color: #BB0B0B;
}


.css-1pahdxg-control {
  border: 1px #172b4d solid !important;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #172b4d !important;
}

.css-1pahdxg-control:hover {
  border-color: #172b4d !important;
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

  .question { /* titre de la question */
    width: 100%;
  }

  .type-select {
    width: 100%;
    margin-left: initial;
  }
  
  .radio-answer-input {
    width: calc(100% - 75px);
  }
  .remove-option {
    width: 25px;
    height: 25px;
    padding: 0;
  }
`;
