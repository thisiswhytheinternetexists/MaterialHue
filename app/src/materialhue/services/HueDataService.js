import 'hue-node-api-browserified'
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
        /* Note: everything *NOT* made by Philips has a comment to indicate it's actual manufacturer */
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
            case "RS 122": //INNR
            case "RS 125": //INNR
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
            case "FL 110": //INNR
            case "ST 110": //INNR
            case "UC 110": //INNR
                //Hue A19 Lux 
                return baseName + "white_and_color_e27_b22" + ".svg";
            case "PL 110": //INNR
                return baseName + "ceiling_round" + ".svg";
            case "Classic A60 W clear - LIGHTIFY": //OSRAM
            case "Classic A60 W clear": //OSRAM
            case "Classic A60 TW": //OSRAM
            case "PAR16 50 TW": //OSRAM
            case "Classic B40 TW - LIGHTIFY": //OSRAM
            case "RB 162": //INNR
            case "RB 165": //INNR
            case "RB 185C": //INNR
                return baseName + "white_e27_b22" + ".svg"
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

    lightStatusWithRGB(id) {
      var deferred = this.$q.defer();
      var state = {};
      this.api.getLightStatusWithRGB(id).then(function(result) {
        state = result.state;
        console.log(state);
      })
      deferred.resolve(state);
      return deferred.promise;
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
};