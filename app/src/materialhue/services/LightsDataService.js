/**
 * Lights DataService
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function LightsDataService($q) {
   var hostname = localStorage.getItem("hue-host"),
    username = localStorage.getItem("hue-token");
    if(hostname.length === 0 || username.length === 0)
      alert("Please set hostname + password manually for now in the demo:\nlocalStorage.setItem(\"hue-host\", \"192.168.x.x\"); localStorage.setItem(\"hue-token\", \"TOKEN_HERE\");");
    var api = new HueApi(hostname, username); 

  // Promise-based API
  return {
    loadAllLights: function() {
      var deferred = $q.defer();
      var r = [];
      // Simulate async nature of real remote calls
      api.lights(function(err, lightsList) {
        for(var i = 0; i < lightsList.lights.length; i++) {
          r.push({
            name: lightsList.lights[i].name,
            type: lightsList.lights[i].type,
            model: lightsList.lights[i].modelid,
            manufacturer: lightsList.lights[i].manufacturername,
            uniqueid: lightsList.lights[i].uniqueid,
            swversion: lightsList.lights[i].swversion,
            state: lightsList.lights[i].state.on
          });
        }
        deferred.resolve(r);
      });
      return deferred.promise;
    }
  };
}
export default ['$q', LightsDataService];