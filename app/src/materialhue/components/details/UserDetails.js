import UserDetailsController from './UserDetailsController'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/materialhue/components/details/UserDetails.html',
    controller       : [ '$mdBottomSheet', '$log', UserDetailsController ]
  }
};