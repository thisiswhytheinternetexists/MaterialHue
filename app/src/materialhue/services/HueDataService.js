/**
 * Hue DataService
 *
 * @constructor
 */
export default class HueDataService { 
  constructor($q) {
    this.api = new HueApi(localStorage.getItem("hue-host"), localStorage.getItem("hue-token")); 
    this.$q = $q;
  }
  
    loadAllUsers() {
      var deferred = this.$q.defer();
      var r = [];
      this.api.getRegisteredUsers(function(err, usersList) {
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
    }

    getIcon(model_id) { 
        var baseName = "../../../../assets/svg/";
        switch(model_id) {
            case "LLC011":
            case "LLC012":
                return baseName + "bloom" + ".svg";
            case "LCT001":
            case "LCT007":
            case "LCT010":
            case "LCT014":
                return baseName + "white_and_color_e27_b22" + ".svg";
            case "LCT003":
            case "LTW013":
            case "LTW014":
                return baseName + "gu10" + ".svg";
            case "LLC020":
                return baseName + "go" + ".svg";
            case "LLC010":
                return baseName + "iris" + ".svg";
            case "LST001":
            case "LST002":
                return baseName + "lightstrip" + ".svg";
            case "LWB004":
            case "LWB006":
            case "LWB007":
            case "LWB010":
            case "LWB014":
                //Hue A19 Lux 
                return baseName + "white_and_color_e27_b22" + ".svg";
            default: 
                return baseName + "other_device" + ".svg";
        }
    }

    loadAllLights() {
      var deferred = this.$q.defer();
      var r = [];
      var _iconfn = this.getIcon;
      this.api.lights(function(err, lightsList) {
        for(var i = 0; i < lightsList.lights.length; i++) {
          r.push({
            id: lightsList.lights[i].id,
            name: lightsList.lights[i].name,
            type: lightsList.lights[i].type,
            model: lightsList.lights[i].modelid,
            manufacturer: lightsList.lights[i].manufacturername,
            uniqueid: lightsList.lights[i].uniqueid,
            swversion: lightsList.lights[i].swversion,
            state: lightsList.lights[i].state.on,
            icon: _iconfn(lightsList.lights[i].modelid)
          });
        }
        deferred.resolve(r);
      });
      return deferred.promise;
    }

    blinkLight(id){
      this.api.setLightState(id, lightState.create().shortAlert()).done();
    }

    loadAllScenes() {
      var deferred = this.$q.defer();
      var r = [];
      this.api.getScenes(function(err, scenesList) {
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
    }

    loadAllGroups() {
       var deferred = this.$q.defer();
      var r = [];
      this.api.getGroups(function(err, groupsList) {
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

    deleteGroup(id) {
       var deferred = this.$q.defer();
      var r = false;
      this.api.deleteGroup(id, function(err, result) {
        r = result;
        deferred.resolve(r);
      });
      return deferred.promise;
    }
};