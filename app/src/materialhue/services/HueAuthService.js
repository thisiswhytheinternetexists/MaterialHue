/**
 * Hue AuthService
 *
 * @constructor
 */
export default class HueAuthService {
  constructor($q) {
    this.$q = $q;
  }
    hasCredentials() {
      var hostname = localStorage.getItem("hue-host"),
          username = localStorage.getItem("hue-token");
      var deferred = this.$q.defer();
      var r = !(!hostname || hostname.length === 0 || !username || username.length === 0);
      deferred.resolve(r);
      return deferred.promise;
    }
}