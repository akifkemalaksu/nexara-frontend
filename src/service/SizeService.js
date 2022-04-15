import ServiceBase from "./ServiceBase";

export default class SizeService extends ServiceBase {
    apiSizePath = "sizes";
    getSizesBySizeSet(sizeSetId) {
        let path = "GetSizesBySizeSet";
        return this.service.get(`${this.apiSizePath}/${path}/${sizeSetId}`);
    }
}
