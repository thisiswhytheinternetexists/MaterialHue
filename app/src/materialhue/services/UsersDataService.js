/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function UsersDataService($q) {
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
      // Simulate async nature of real remote calls
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
    }
  };
}
export default ['$q', UsersDataService];