import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '../components/app-button/app-button.js';
import '../components/app-counter/app-counter.js';
import '../components/app-title/app-title.js';

/**
 * @customElement
 * @polymer
 */
class AppWelcome extends PolymerElement {
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
        .card-content {
            display:flex;
            padding-bottom: 78px;
        }
        .app-button {
                padding: 0px 30px 100px 16px;
                width: 50%;
        }
        .app-title {
            padding: 66px;
        }
        .actions {
            display: flex;
            width: 100%;
            justify-content: center;
            align-content: center;
        }
      </style>
      <paper-card>
        <app-title class="app-title" title="welcome!" text="The last time you accessed was"></app-title>
        <div class="card-content">
            <app-counter counter="{{days}}" text="days"></app-counter>
            <app-counter counter="{{hours}}" text="hours"></app-counter>
            <app-counter counter="{{minutes}}" text="minutes"></app-counter>
            <app-counter counter="{{seconds}}" text="seconds"></app-counter>
        </div>
        <div class="actions">
            <app-button id-button="button-welcome" class="app-button" title="logout" on-app-button-click="_logout"></app-button>
        </div>
      </paper-card>
      
    `;
  }
  static get properties() {
    return {
      days: {
        type: String,
        value: ''
      },
      hours: {
        type: String,
        value: ''
      },
      minutes: {
        type: String,
        value: ''
      },
      seconds: {
        type: String,
        value: ''
      },
      isWelcomePage: {
        type: Boolean,
        value: false,
        observer: '_loadCounters'
      }
    }
  }
  ready() {
    super.ready();
    window.onbeforeunload = this._logout;
  }

  _loadCounters() {
    if (this.isWelcomePage) {
      if(!localStorage.getItem(sessionStorage.getItem('id'))) {
        localStorage.setItem(sessionStorage.getItem('id'), new Date());
      }
      
      const conexionDate = new Date(localStorage.getItem(sessionStorage.getItem('id')));
      const currentDate =  new Date();
       
      const diffMs = (currentDate - conexionDate);
      const diffTime = Math.abs(currentDate.getTime() - conexionDate.getTime());
     
      const days = parseInt((diffMs / (1000 * 3600 * 24)));
      const diffHrs =  parseInt(Math.floor((diffMs % 86400000) / 3600000)); 
      const minutes =  parseInt(Math.round(((diffMs % 86400000) % 3600000) / 60000));

      this.days = days;
      this.hours = diffHrs;
      this.minutes = minutes;
      this.seconds = parseInt(Math.abs(diffTime / 1000));

    }
  }
  _logout() {
    localStorage.setItem(sessionStorage.getItem('id'), new Date());
    sessionStorage.removeItem('id');
    this.isWelcomePage = false;
    this.dispatchEvent(new CustomEvent('app-button-logout', {
      bubbles: true,
      composed: true,
      detail: {logout:true}
    }));
  }
}

window.customElements.define('app-welcome', AppWelcome);