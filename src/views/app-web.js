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
            <app-button title="login"></app-button>
          </div>
        </paper-card>
        <app-welcome page="welcome" selected="{{nextPage}}"></app-welcome>
      </iron-pages>

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
      users: {
        type: Object,
        value: [{
            "id": 1,
            "email": "1@1.es",
            "password": "1"
        },
        {
            "id": 2,
            "email": "pepe@gmail.com",
            "password": "1234"
        },
        {
            "id": 3,
            "email": "arturo@gmail.com",
            "password": "0000"
        },
        {
            "id": 4,
            "email": "victor@gmail.com",
            "password": "78945"
        },
        {
            "id": 5,
            "email": "ruben@gmail.com",
            "password": "95687"
        },
        {
            "id": 6,
            "email": "javi@gmail.com",
            "password": "7548"
        }]
      }
    };
  }
  ready() {
    super.ready();
    this.set('route.path', 'login');
    this.addEventListener('app-button-click', this._validateUser);
    this.addEventListener('app-button-logout', this._logoutPage)
  }
  _validateUser() {
    if(this.email || this.password) {
      var validate = false;
      this.showError = false;
      for(var i=0; i < this.users.length;i++) {
        if(this.users[i].email == this.email && this.users[i].password == this.password) {
          validate = true;
        }
      }
      if(validate) {
        // limpio los campos antes de cambiar de pagina
        this.email = '';
        this.password = '';
        this.nextPage = true;
        this.set('route.path', 'welcome');
      } else {
        if (this.email != "" && this.password != "") {
          this.errorText = this.errorText;
          this.showError = true;
        }
      }
    }
  }
  _logoutPage(event) {
    if(event.detail.logout) {
        this.nextPage = false;
        this.set('route.path', 'login');
    }
  }
}
window.customElements.define('app-web', AppWeb);
