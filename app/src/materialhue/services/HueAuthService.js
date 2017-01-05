/**
 * Hue AuthService
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function HueAuthService($q) {
  // Promise-based API
  return {
    hasCredentials: function() {
      var hostname = localStorage.getItem("hue-host"),
      username = localStorage.getItem("hue-token");
      var deferred = $q.defer();
      var r = !(!hostname || hostname.length === 0 || !username || username.length === 0);
      deferred.resolve(r);
      return deferred.promise;
    }
  };
}
export default ['$q', HueAuthService];