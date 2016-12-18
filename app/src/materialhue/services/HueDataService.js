/**
 * Hue DataService
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function HueDataService($q) {
   var hostname = localStorage.getItem("hue-host"),
    username = localStorage.getItem("hue-token");
    if(hostname.length === 0 || username.length === 0)
      alert("Please set hostname + password manually for now in the demo:\nlocalStorage.setItem(\"hue-host\", \"192.168.x.x\"); localStorage.setItem(\"hue-token\", \"TOKEN_HERE\");");
    var api = new HueApi(hostname, username); 

  // Promise-based API
  return {
    loadAllUsers: function() {
      var deferred = $q.defer();
      var r = [];
      api.getRegisteredUsers(function(err, usersList) {
        for(var i = 0; i < usersList.devices.length; i++) {
          r.push({
            name: usersList.devices[i].name,
            token: usersList.devices[i].username,
            avatar: 'svg-' + ((Math.floor((Math.random() * 10) + 1) >= 4 ) ? '1' : '4'),
            date_created: new Date(usersList.devices[i].created),
            date_accessed: new Date(usersList.devices[i].accessed)
          });
        }
        deferred.resolve(r);
      });
      return deferred.promise;
    },
    loadAllLights: function() {
      var deferred = $q.defer();
      var r = [];
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
    },
    loadAllScenes: function() {
      var deferred = $q.defer();
      var r = [];
      api.getScenes(function(err, scenesList) {
        for(var i = 0; i < scenesList.length; i++) {
          r.push({
            name: scenesList[i].name,
            id: scenesList[i].id,
            owner: scenesList[i].owner,
            recycle: scenesList[i].recycle,
            locked: scenesList[i].locked,
            lastupdated: new Date(scenesList[i].swversion),
            version: scenesList[i].version
          });
        }
        deferred.resolve(r);
      });
      return deferred.promise;
    },
    loadAllGroups: function() {
       var deferred = $q.defer();
      var r = [];
      api.getGroups(function(err, groupsList) {
        for(var i = 0; i < groupsList.length; i++) {
          r.push({
            name: groupsList[i].name,
            id: groupsList[i].id,
            type: groupsList[i].type
          });
        }
        deferred.resolve(r);
      });
      return deferred.promise;
    }
  };
}
export default ['$q', HueDataService];