import ServiceBase from "./ServiceBase";

export default class ColorService extends ServiceBase{
    apiColorPath = "colors";
    getColors() {
        return this.service.get(this.apiColorPath);
    }
}