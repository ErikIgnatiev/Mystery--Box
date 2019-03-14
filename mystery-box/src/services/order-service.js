import { post } from '../data/crud';

class OrderService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/orders';
        this.orderUrl = `${this.baseUrl}/submit`;
    }

    order(data) {
        return post(this.orderUrl, data)
    }
}

export default OrderService;