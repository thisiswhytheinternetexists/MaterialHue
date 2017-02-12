import LightDetailsController from './LightDetailsController'
import HueDataService from '../../services/HueDataService'
export default {
  name : 'lightDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/materialhue/components/details/LightDetails.html',
    controller       : LightDetailsController
  }
};