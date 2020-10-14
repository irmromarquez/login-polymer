import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js'

/**
 * `login-input`
 * text field to login
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LoginInput extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <paper-input label$="[[title]]" type="[[type]]"></paper-input>
    `;
  }
  static get properties() {
    return {
      title: {
        type: String,
        value: '',
      },
      type: {
        type: String,
        value: ''
      }
    };
  }
}

window.customElements.define('login-input', LoginInput);
