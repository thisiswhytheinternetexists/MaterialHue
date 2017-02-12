import GroupDetailsController from './GroupDetailsController'
import HueDataService from '../../services/HueDataService'
export default {
  name : 'groupDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/materialhue/components/details/GroupDetails.html',
    controller       :  GroupDetailsController,
    service          :  HueDataService 
  }
};