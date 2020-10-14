import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `login-button`
 * button to login
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LoginButton extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .login-button-counter {
          padding: var(--login-button-counter-padding,8px);
          width: var(--login-button-counter-width,100%);
          justify-content: center;
          background: var(--login-button-counter-background,#110479);
          color: var(--login-button-counter-color,white);
          border: var(--login-button-counter-border,0px);
          display:flex;
          position: relative;
        }
        .login-button-counter:hover {
          widht="100%";
          cursor:pointer;
        }
        .login-button-counter:before {
          content:"";
          position: absolute;
          top: 0px;
          left: 0px;
          width: 0px;
          height: 100%;
          background: var(--login-button-counter-before-background,#1F05EE);
          transition: all 2s ease;
        }
        .login-button-title {
          position:relative;
        }
        .login-button-counter:hover:before {
            width: 100%;
        }
        
      </style>
      <span class="login-button-counter">
         <span class="login-button-title">[[title]]</span>
    `;
  }
  static get properties() {
    return {
      title: {
        type: String,
        value: 'login in',
      },
    };
  }
}

window.customElements.define('login-button', LoginButton);