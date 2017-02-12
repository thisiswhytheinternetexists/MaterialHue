export default class GroupDetailsController  {
    /*@ngInject*/
    constructor(HueDataService) {
        this.hue = HueDataService.api;
    }
    deleteGroup(groupId) {
        this.hue.deleteGroup(groupId).then(function(result) {
            if(result === true)
                console.log("Success! Todo: show dialog and refresh Groups.");
            else console.log("Error while removing group!", result);
        });
    }
}

GroupDetailsController.$inject = ['HueDataService'];