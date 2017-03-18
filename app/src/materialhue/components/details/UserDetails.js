import UserDetailsController from './UserDetailsController'
import HueDataService from '../../services/HueDataService'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/materialhue/components/details/UserDetails.html',
    controller       : UserDetailsController,
    service          : HueDataService 
  }
};