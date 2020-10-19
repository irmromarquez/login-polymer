import {PolymerElement} from '@polymer/polymer/polymer-element.js';
/**
 * `login-button`
 * button to login
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class appServiceUsers extends PolymerElement {
  static get properties() {
    return {
      callRequest: {
        type: Boolean,
        value: false,
        observer: '_sendRequest'
      },
      users: {
        type: Object,
        value: ''
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
   /**
    * Fired when you click on the button
    * @event app-button-click
    */
   _sendRequest() {
     console.log("pasa por aki");
      if(this.callRequest) {
        // se vuelve a poner a false para la siguiente llamada
        this.callRequest = false;
        // simula la llamda al servidor y se obtendría un true o false para pasar a la siguiente pagina.
        // en este caso lo que hago es obtener un mock, compruebo si existe el usuario y cambio de página.
        var xmlhttp = this._getxHRequest();
        var validate = false;
        var params = this.params;
        var element = this;
        var idUser = '';
        xmlhttp.onreadystatechange = function() {
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var users = JSON.parse(xmlhttp.responseText);
            var objParams = params; 
            for(var i=0; i < users.length;i++) {
              if(users[i].email == objParams.email && users[i].password == objParams.password) {
                validate = true;
                idUser = users[i].id;
               
              }
            }
            element.dispatchEvent(new CustomEvent("app-service-users-request", {
              bubbles: true,
              composed: true,
              detail: {isValidate:validate,id:idUser}
            }));
            
          } 
        }
        xmlhttp.open(this.typeRequest,this.url);
        xmlhttp.send();
      }
    }
    _getxHRequest() {
        var xHRequest;
        try {
            xHRequest = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                xHRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    xHRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    xHRequest = false;
                }
            }
        }
        return xHRequest;
    }
}
window.customElements.define('app-service-users', appServiceUsers);