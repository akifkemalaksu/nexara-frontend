import ServiceBase from "./ServiceBase";

export default class SizeSetService extends ServiceBase{
    apiSizeSetPath = "sizeSet";
    getSizeSets() {
        return this.service.get(this.apiSizeSetPath);
    }
}
