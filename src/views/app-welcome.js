import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '../components/app-button.js';
import '../components/app-counter.js';
import '../components/app-title.js';

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
            <app-button class="app-button" title="logout"></app-button>
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
      selected: {
        type: Boolean,
        value: false,
        observer: '_loadCounters'
      }
    }
  }
  ready() {
    super.ready();
    this.addEventListener('app-button-click', this._logout);
  }

  _loadCounters() {
    if (this.selected) {
      if(typeof(localStorage.getItem("conexion"))=='object') {
        localStorage.setItem("conexion", new Date());
      }
  
      var conexionDate = new Date(localStorage.getItem("conexion"));
      var currentDate =  new Date();
       
      var diffMs = (currentDate - conexionDate);
      var diffTime = Math.abs(currentDate.getTime () - conexionDate.getTime ());
     
      var days = parseInt((diffMs / (1000 * 3600 * 24)));
      var diffHrs =  parseInt(Math.floor((diffMs % 86400000) / 3600000)); 
      var minutes =  parseInt(Math.round(((diffMs % 86400000) % 3600000) / 60000));

      this.days = days;
      this.hours = diffHrs;
      this.minutes = minutes;
      this.seconds = parseInt(Math.abs(diffTime / 1000));

    }
  }

  _saveSession() {
    if (typeof(Storage) !== "undefined") {
      this._loadCounters();
    }
  }
  _logout() {
    localStorage.setItem("conexion", new Date());
    this.selected = false;
    this.dispatchEvent(new CustomEvent("app-button-logout", {
      bubbles: true,
      composed: true,
      detail: {logout:true}
    }));
  }
}

window.customElements.define('app-welcome', AppWelcome);