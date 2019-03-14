import { get } from '../data/crud.js'

class OrdersService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/orders';
        this.pendingOrdersUrl = `${this.baseUrl}/all`;
    }

    getPendingOrders() {
        return get(this.pendingOrdersUrl);
    }
}

export default OrdersService;