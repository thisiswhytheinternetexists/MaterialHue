// Load the custom app ES6 modules

import HueDataService from 'src/materialhue/services/HueDataService';

import NavitemsList from 'src/materialhue/components/list/NavitemsList';
import UserDetails from 'src/materialhue/components/details/UserDetails';

// Define the Angular 'materialhue' module
export default angular
  .module("materialhue", ['ngMaterial'])

  .component(NavitemsList.name, NavitemsList.config)
  .component(UserDetails.name, UserDetails.config)

  .service("HueDataService", HueDataService);
