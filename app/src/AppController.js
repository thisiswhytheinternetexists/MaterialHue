/**
 * Main App Controller for the Angular Material Starter App
 * @param HueDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController(HueDataService, $mdSidenav) {
  var self = this;

  self.selected     = null;
  self.selectItem   = selectItem;
  self.toggleList   = toggleUsersList;

  self.users        = [ ];
  self.lights       = [ ];
  self.scenes       = [ ];
  self.groups       = [ ];

  // Load all registered users

  HueDataService
        .loadAllUsers()
        .then( function( users ) {
          self.users    = [].concat(users);
          self.selected = users[0];
        });

  HueDataService
        .loadAllLights()
        .then( function( lights ) {
          self.lights    = [].concat(lights);
          //self.selected = lights[0];
        });

  HueDataService
        .loadAllScenes()
        .then( function( scenes ) {
          self.scenes    = [].concat(scenes);
          //self.selected = scenes[0];
        });

  HueDataService
        .loadAllGroups()
        .then( function( groups ) {
          self.groups    = [].concat(groups);
          //self.selected = scenes[0];
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

export default [ 'HueDataService', '$mdSidenav', AppController ];
