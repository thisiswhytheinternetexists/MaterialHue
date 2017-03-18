export default class LightDetailsController  {
    /*@ngInject*/
    constructor(HueDataService) {
        this.hue = HueDataService.api;
    }

        updatelightstate(light) {
            this.hue.setLightState(light.id, { "on" : light.state.on }).done();
            console.log("light is now: ", light);
        }
}

LightDetailsController.$inject = ['HueDataService'];