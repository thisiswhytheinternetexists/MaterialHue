// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

//import 'tinycolor'
//import 'md-color-picker'

import AppController from 'src/AppController';
import MaterialHue from 'src/materialhue/MaterialHue';

export default angular.module( 'material-hue', [ 'ngMaterial', MaterialHue.name ] )
  .config(($mdIconProvider, $mdThemingProvider) => {
    // Register the user `avatar` icons
    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
  })
  .controller('AppController', AppController);
