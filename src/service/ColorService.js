import ServiceBase from "./ServiceBase";

export default class ColorService extends ServiceBase{
    apiColorPath = "color";
    getColors() {
        return this.service.get(this.apiColorPath);
    }
}