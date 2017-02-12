// Notice that we do not have a controller since this component does not
// have any specialized logic.

export default {
  name : 'navitemsList',
  config : {
    bindings         : {  users: '<', lights: '<', groups: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/materialhue/components/list/NavitemsList.html'
  }
};
