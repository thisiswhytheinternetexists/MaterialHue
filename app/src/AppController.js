/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param LightsDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController(UsersDataService, LightsDataService, $mdSidenav) {
  var self = this;

  self.selected     = null;
  self.users        = [ ];
  self.selectItem   = selectItem;
  self.toggleList   = toggleUsersList;
  self.lights       = [ ];

  // Load all registered users

  UsersDataService
        .loadAllUsers()
        .then( function( users ) {
          self.users    = [].concat(users);
          self.selected = users[0];
        });

  LightsDataService
        .loadAllLights()
        .then( function( lights ) {
          self.lights    = [].concat(lights);
          //self.selected = lights[0];
        });

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }

  function selectItem ( user, light ) {
    var _item = user || light;
    if(this.users.indexOf(_item) !== -1) {
      self.selected = _item;
    } else if (this.lights.indexOf(_item) !== -1) {
      self.selected = _item;
    } else {
      console.log('unknown item');
      console.log(_item);
    }
  }
}

export default [ 'UsersDataService', 'LightsDataService', '$mdSidenav', AppController ];
