import ServiceBase from "./ServiceBase";

export default class OrderService extends ServiceBase {
    apiOrderPath = "order";

    addOrder(order) {
        return this.service.post(this.apiOrderPath, order);
    }
}