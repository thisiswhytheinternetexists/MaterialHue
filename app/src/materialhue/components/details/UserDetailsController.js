export default class UserDetailsController  {
    /*@ngInject*/
    constructor(HueDataService) {
        this.hue = HueDataService.api;
    }
    deleteUser(userId) {
        this.hue.deleteUser(userId).then(function(result) {
            if(result === true)
                console.log("Success! Todo: show dialog and refresh Users.");
            else console.log("Error while removing user!", result);
        });
    }
}

UserDetailsController.$inject = ['HueDataService'];