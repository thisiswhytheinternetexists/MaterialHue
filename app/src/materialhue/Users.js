// Load the custom app ES6 modules

import UsersDataService from 'src/materialhue/services/UsersDataService';

import UsersList from 'src/materialhue/components/list/UsersList';
import UserDetails from 'src/materialhue/components/details/UserDetails';

// Define the Angular 'materialhue' module

export default angular
  .module("materialhue", ['ngMaterial'])

  .component(UsersList.name, UsersList.config)
  .component(UserDetails.name, UserDetails.config)

  .service("UsersDataService", UsersDataService);
