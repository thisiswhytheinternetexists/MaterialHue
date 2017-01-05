/**
 * Main App Controller for the Angular Material Starter App
 * @param HueAuthService
 * @param HueDataService
 * @param $mdSidenav
 * @param $mdDialog
 * @constructor
 */
function AppController(HueAuthService, HueDataService, $mdSidenav, $mdDialog) {
    var self = this;

  self.selected     = null;
  self.selectedUser = null;
  self.selectedLight = null;
  self.selectItem   = selectItem;
  self.toggleList   = toggleUsersList;

  self.users        = [ ];
  self.lights       = [ ];
  self.scenes       = [ ];
  self.groups       = [ ];

    function startPairing(bridges, ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        if (bridges.length == 1) {
            var hue = new HueApi();
            hue.registerUser(bridges[0].ipaddress, "MaterialHue")
                .then(function(token) {
                    storeCredentials(token, bridges[0].ipaddress)
                })
                .fail(showCouldNotConnect)
                .done();
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .title('No bridges found')
                .textContent('Please connect to your WiFi network and refresh the page')
                .ariaLabel('No bridge found')
                .ok('Oops')
            );
        }
    };

    function showCouldNotConnect(state) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .title('Press to pair')
            .textContent('Please press the pairing button on your Hue to authenticate this app.')
            .ariaLabel('Alert press pairing button')
            .ok('Did it!')
        ).then(function() {
            nupnpSearch().then(function(bridges) {
                startPairing(bridges)
            }).done();
        });
    }

    function storeCredentials(token, ip) {
        localStorage.setItem('hue-host', ip);
        localStorage.setItem('hue-token', token);
        console.log(ip, token);
    }

    // Load all registered users
    HueAuthService.hasCredentials().then(function(hasCredentials) {
        if (hasCredentials) {
            HueDataService
                .loadAllUsers()
                .then(function(users) {
                    self.users = [].concat(users);
                });

            HueDataService
                .loadAllLights()
                .then(function(lights) {
                    self.lights = [].concat(lights);
                });

            HueDataService
                .loadAllScenes()
                .then(function(scenes) {
                    self.scenes = [].concat(scenes);
                });

            HueDataService
                .loadAllGroups()
                .then(function(groups) {
                    self.groups = [].concat(groups);
                });

        } else {
            nupnpSearch().then(function(bridges) {
                startPairing(bridges)
            }).done();
        }
    })

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
      self.selectedUser = _item;
    } else if (this.lights.indexOf(_item) !== -1) {
      self.selected = _item;
      self.selectedLight = _item;
      HueDataService.blinkLight(_item.id);
    } else {
      console.log('unknown item');
      console.log(_item);
    }
}

export default ['HueAuthService', 'HueDataService', '$mdSidenav', '$mdDialog', AppController];