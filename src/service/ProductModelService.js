import ServiceBase from "./ServiceBase";

export default class ProductModelService extends ServiceBase{
    apiProductModelPath = "productmodel";
    getProductModels() {
        return this.service.get(this.apiProductModelPath);
    }
}
