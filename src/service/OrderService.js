import ServiceBase from "./ServiceBase";

export default class OrderService extends ServiceBase {
    apiOrderPath = "orders";

    addOrder(order) {
        return this.service.post(this.apiOrderPath, order);
    }

    deleteOrder(orderId) {
        return this.service.delete(`${this.apiOrderPath}/${orderId}`);
    }

    getOrders() {
        return this.service.get(this.apiOrderPath);
    }
}