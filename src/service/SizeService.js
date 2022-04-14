import ServiceBase from "./ServiceBase";

export default class SizeService extends ServiceBase {
    apiSizePath = "size";
    getSizesBySizeSet(sizeSetId) {
        let path = "GetSizesBySizeSet";
        return this.service.get(`${this.apiSizePath}/${path}/${sizeSetId}`);
    }
}
