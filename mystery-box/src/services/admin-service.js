import { get } from '../data/crud.js'

class OrdersService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/orders';
        this.pendingOrdersUrl = `${this.baseUrl}/all`;
        this.myOrdersUrl = `${this.baseUrl}/user`
    }

    getPendingOrders() {
        return get(this.pendingOrdersUrl);
    }

    getMyOrders() {
        return get(this.myOrdersUrl);
    }
}

export default OrdersService;