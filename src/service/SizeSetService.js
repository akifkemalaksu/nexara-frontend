import ServiceBase from "./ServiceBase";

export default class SizeSetService extends ServiceBase{
    apiSizeSetPath = "sizesets";
    getSizeSets() {
        return this.service.get(this.apiSizeSetPath);
    }
}
