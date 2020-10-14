import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `login-counter`
 * record the time of the user&#39;s last connection
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LoginCounter extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .login-countainer {
          display: flex;
          width: var(--login-counter-countainer-with,100%);
          flex-wrap:wrap;
          justify-content: center;
        }
        .login-counter {
          display: flex;
          font-size: var(--login-counter-size,4em);
          color: var(--login-counter-color,#CBC4C3);
          justify-content: center;
          width: var(--login-counter-counter-with,100%);
        }
        .login-title {
          display: flex;
          width: var(--login-counter-title-with,100%);
          justify-content: center;
          color: var(--login-title-color,#CBC4C3);
          font-size: var(--login-title-size,1.5em);
        }
      </style>
      <div class="login-countainer">
        <div class="login-counter">[[counter]]</div>
        <div class="login-title">[[text]]</div>
      </div>
    `;
  }
  static get properties() {
    return {
      counter: {
        type: String,
        value: '',
      },
      text: {
        type: String,
        value: ""
      }
    };
  }
}

window.customElements.define('login-counter', LoginCounter);
