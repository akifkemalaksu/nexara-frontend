import ServiceBase from "./ServiceBase";

export default class ProductModelService extends ServiceBase{
    apiProductModelPath = "productmodels";
    getProductModels() {
        return this.service.get(this.apiProductModelPath);
    }
}
