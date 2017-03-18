/**
 * Hue AuthService
 *
 * @constructor
 */
export default class HueAuthService {
  constructor($q) {
    this.$q = $q;
    this.checkCredentialsPresentInLocalStorage = function() {
      return this.$q(function(resolve, reject) {
        var hostname = localStorage.getItem("hue-host");
        var username = localStorage.getItem("hue-token");
        if(!(!hostname || hostname.length === 0 || !username || username.length === 0)) {
          resolve({ username: username, hostname: hostname });
        } else {
          reject("Credentials are missing");
        }
      })
    };
  }  
}