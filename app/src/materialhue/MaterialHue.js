// Load the custom app ES6 modules

import HueAuthService from 'src/materialhue/services/HueAuthService';
import HueDataService from 'src/materialhue/services/HueDataService';

import NavitemsList from 'src/materialhue/components/list/NavitemsList';
import UserDetails from 'src/materialhue/components/details/UserDetails';
import LightDetails from 'src/materialhue/components/details/LightDetails';

// Define the Angular 'materialhue' module
export default angular
  .module("materialhue", ['ngMaterial'])

  .component(NavitemsList.name, NavitemsList.config)
  .component(LightDetails.name, LightDetails.config)
  .component(UserDetails.name, UserDetails.config)

  .service("HueAuthService", HueAuthService)
  .service("HueDataService", HueDataService);
