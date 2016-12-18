// Load the custom app ES6 modules

import UsersDataService from 'src/materialhue/services/UsersDataService';

import NavitemsList from 'src/materialhue/components/list/NavitemsList';
import UserDetails from 'src/materialhue/components/details/UserDetails';

import LightsDataService from 'src/materialhue/services/LightsDataService';

// Define the Angular 'materialhue' module

export default angular
  .module("materialhue", ['ngMaterial'])

  .component(NavitemsList.name, NavitemsList.config)
  .component(UserDetails.name, UserDetails.config)

  .service("UsersDataService", UsersDataService)
  .service("LightsDataService", LightsDataService);
