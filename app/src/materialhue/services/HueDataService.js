/**
 * Hue DataService
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function HueDataService($q) { 
  var api = new HueApi(localStorage.getItem("hue-host"), localStorage.getItem("hue-token")); 

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
            id: lightsList.lights[i].id,
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
    blinkLight: function(id){
      api.setLightState(id, lightState.create().shortAlert()).done();
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
            type: groupsList[i].type,
            recycle: groupsList[i].recycle,
            lights: groupsList[i].lights,
            type: groupsList[i].type,
            state: groupsList[i].state
          });
        }
        deferred.resolve(r);
      });
      return deferred.promise;
    }
  };
}
export default ['$q', HueDataService];