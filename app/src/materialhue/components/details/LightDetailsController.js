export default class LightDetailsController  {
    /*@ngInject*/
    constructor(HueDataService) {
        this.hue = HueDataService.api;
    }
}

LightDetailsController.$inject = ['HueDataService'];