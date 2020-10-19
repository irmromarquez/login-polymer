import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `login-title`
 * title of login
 *
 * @customElement
 * @polymer
 */
class appTitle extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .login-title-container {
          display: flex;
          widht: 100%;
          flex-wrap:wrap;
          justify-content: center;
        }
        .login-title-title {
          font-size: var(--login-title-size,2em);
          width: 100%;
          justify-content: center;
          display: flex;
          font-weight: var(--login-title-font-weight,bold);
        }
        .login-title-text {
          font-size: var(--login-title-text,0.9em);
          width: 100%;
          justify-content: center;
          display: flex;
          margin-top: var(--login-title-margin-top,6px);
          font-weight:var(--login-title-text-weight,bold);
        }
      </style>
      <div class="login-title-container">
         <div class="login-title-title">
            [[title]]
         </div>
         <div class="login-title-text">
            [[text]]
         </div>
      </div>
    `;
  }
  static get properties() {
    return {
      title: {
        type: String,
        value: '',
      },
      text: {
        type: String,
        value: ''
      }
    };
  }
}
window.customElements.define('app-title', appTitle);
