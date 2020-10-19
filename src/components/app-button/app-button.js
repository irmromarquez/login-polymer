import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
/**
 * `login-button`
 * button to login
 *
 * @customElement
 * @polymer
 */
class appButton extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .login-button-content {
          padding: var(--login-button-counter-padding,8px);
          width: var(--login-button-counter-width,100%);
          justify-content: center;
          background: var(--login-button-counter-background,#110479);
          color: var(--login-button-counter-color,white);
          border: var(--login-button-counter-border,0px);
          display:flex;
          position: relative;
        }
        .login-button-content:hover {
          widht="100%";
          cursor:pointer;
        }
        .login-button-content:before {
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
        .login-button-content:hover:before {
            width: 100%;
        }
        
      </style>
      <span class="login-button-content" role="button">
         <span class="login-button-title">[[title]]</span>
      </span>
    `;
  }
  static get properties() {
    return {
      title: {
        type: String,
        value: '',
      },
      idButton: {
        type: String,
        value: ''
      }
    };
  }
  ready() {
    super.ready();
    this.addEventListener('click', this._onClick);
   }
  
   /**
    * Fired when you click on the button
    * @event app-button-click
    */
  _onClick() {
    this.dispatchEvent(new CustomEvent('app-button-click', {
      bubbles: true,
      composed: true,
      detail: {id:this.idButton}
    }));
  }
}
window.customElements.define('app-button', appButton);