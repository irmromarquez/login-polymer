import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '../components/app-button/app-button.js';
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
          <div class="errors-messages" hidden$="{{!showError}}">[[errorText]]</div>
          <div class="card-content">
            <paper-input type="email" label="Email" value="{{email}}"></paper-input>
            <paper-input type="password" label="Password" value="{{password}}"></paper-input>
          </div>
          <div class="card-actions">
            <app-button id="btn-login" title="login" on-app-button-click="_validateUser"></app-button>
          </div>
        </paper-card>
        <app-welcome page="welcome" is-welcome-page="{{showWelcomePage}}" on-app-button-logout="_logoutPage"></app-welcome>
      </iron-pages>
      <app-service-users params="{{params}}" call-request="{{call}}" url="{{url}}" type-request="{{typeRequest}}" on-app-service-users-request="_checkUser"></app-service-users>

    `;
  }
  static get properties() {
    return {
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
      showWelcomePage : {
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
  }
  _validateUser(evt) {
     this.params.email = this.email;
     this.params.password = this.password;
     if(evt.path[0].id === 'btn-login') {
      this.call = true;
     }
  }
  _checkUser(evt) {
    this.call = false;
    if (evt.detail.isValidate) {
      sessionStorage.setItem('id',evt.detail.id);
      this.showWelcomePage = true;
      this.set('route.path', 'welcome');
      this.email = '';
      this.password = '';
    } else {
      this.showError = true;
    }
  }
  _logoutPage(event) {
    if(event.detail.logout) {
        this.showWelcomePage = false;
        this.set('route.path', 'login');
        this.showError = false;
    }
  }
}
window.customElements.define('app-web', AppWeb);
