import LightDetailsController from './LightDetailsController'

export default {
  name : 'lightDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/materialhue/components/details/LightDetails.html',
    controller       : LightDetailsController
  }
};