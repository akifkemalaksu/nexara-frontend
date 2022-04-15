import ServiceBase from './ServiceBase'
export default class OrderDetailService extends ServiceBase {
    apiOrderDetailPath = "orderdetails";

    getOrderDetailsByOrder(orderId) {
        return this.service.get(`${this.apiOrderDetailPath}/${orderId}`);
    }
}