import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '../components/app-button.js';
import '../views/app-welcome.js';
import '../services/app-service-users.js'

/**
 * @customElement
 * @polymer
 */
class AppWeb extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 1rem;
          padding: 1rem;
          /* IMPORTANTE */
          text-align: center;
        }
        .card-actions {
          padding: 0px 30px 16px 16px;
        }
        paper-card {
          width:30%;
        }
        iron-icon {
          margin-top:20%;
          height:20%;
          width:20%;
          color: #097DFF;
        }
        .errors-messages {
          margin: 20px 30px 0px 30px;
          color: white;
          padding: 30px;
          background: #FF4747;
        }
      </style>
      <app-location route="{{route}}"></app-location>

      <app-route
        route="{{route}}"
        pattern="/:page"
        data="{{data}}"
        tail="{{tail}}">
      </app-route>

      <iron-pages selected="[[data.page]]" attr-for-selected="page">
        <paper-card page="login">
          <iron-icon icon="lock-outline"></iron-icon>
          <div class="errors-messages" hidden$="{{!showError}}">{{errorText}}</div>
          <div class="card-content">
            <paper-input label="Email" Value="{{email}}"></paper-input>
            <paper-input label="Password" Value="{{password}}"></paper-input>
          </div>
          <div class="card-actions">
            <app-button id="btn-login" title="login"></app-button>
          </div>
        </paper-card>
        <app-welcome page="welcome" selected="{{nextPage}}"></app-welcome>
      </iron-pages>
      <app-service-users params="{{params}}" call-request="{{call}}" url="{{url}}" type-request="{{typeRequest}}"></app-service-users>

    `;
  }
  static get properties() {
    return {
      login : {
        type: Boolean,
        value: false
      },
      errorText: {
        type: String,
        value: 'Usuario o contraseña incorrecta'
      },
      showError: {
        type: Boolean,
        value: false
      },
      email: {
        type: String,
        value: ''
      },
      nextPage: {
        type: Boolean,
        value: false,
      },
      call: {
        type: Boolean,
        value: false
      },
      url: {
        type: String,
        value: 'src/mock/users.json'
      },
      typeRequest: {
        type: String,
        value: 'GET'
      },
      params: {
        type: Object,
        value : function() {
          return {
            email: '',
            password: ''
          };
        }
      }
    };
  }
  ready() {
    super.ready();
    this.set('route.path', 'login');
    this.addEventListener('app-button-click', this._validateUser);
    this.addEventListener('app-button-logout', this._logoutPage);
    this.addEventListener('app-service-users-request',this._checkUser);
  }
  _validateUser(evt) {
     this.params.email = this.email;
     this.params.password = this.password;
     if(evt.path[0].id == 'btn-login') {
      this.call = true;
     }
  }
  _checkUser(evt) {
    this.call = false;
    if (evt.detail.isValidate) {
      sessionStorage.setItem("id",evt.detail.id);
      this.nextPage = true;
      this.set('route.path', 'welcome');
      this.email = '';
      this.password = '';
    } else {
      this.showError = true;
    }
  }
  _logoutPage(event) {
    if(event.detail.logout) {
        this.nextPage = false;
        this.set('route.path', 'login');
        this.showError = false;
    }
  }
}
window.customElements.define('app-web', AppWeb);
