import {PolymerElement} from '@polymer/polymer/polymer-element.js';
/**
 * `app-service-users`
 *
 * @customElement
 * @polymer
 */
class appServiceUsers extends PolymerElement {
  static get properties() {
    return {
      callRequest: {
        type: Boolean,
        value: false,
        observer: '_sendRequest'
      },
      params: {
        type: Object,
        value: ''
      },
      url: {
        type: String,
        value: ''
      },
      typeRequest: {
        type: String,
        value: ''
      },
    };
  }
   _sendRequest() {
      if(this.callRequest) {
        this.callRequest = false;
        const xmlhttp = this._getxHRequest();
        const params = this.params;
        let findUser;
        xmlhttp.onreadystatechange = function() {
          if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const users = JSON.parse(xmlhttp.responseText);
            const objParams = params; 

            findUser = users.find((item)=>{
              return item.email === objParams.email && item.password === objParams.password;
            });
          }
          /**
          * Fired when it is received the request
          * @event app-service-users-request
          */
          this.dispatchEvent(new CustomEvent('app-service-users-request', {
            bubbles: true,
            composed: true,
            detail: {isValidate: Boolean(findUser),id:findUser ? findUser.id : ''}
          }));
        }.bind(this);
        xmlhttp.open(this.typeRequest,this.url);
        xmlhttp.send();
      }
    }
    _getxHRequest() {
        let xHRequest;
        try {
            xHRequest = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                xHRequest = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (othermicrosoft) {
                try {
                    xHRequest = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (failed) {
                    xHRequest = false;
                }
            }
        }
        return xHRequest;
    }
}
window.customElements.define('app-service-users', appServiceUsers);