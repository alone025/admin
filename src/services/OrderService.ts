import $api from "../http";



export default class OrderService {
    static async getOrders () {
        const orders = await $api.get('/order/all');
        return orders.data;
    }

    static async getOrder(id: string) {
        const order = await $api.get(`/order/get/${id}`);
        return order.data;
    }

    
    static async getExel() {
        const order = await $api.get(`/analiytics/exel/users`);
        return order.data;
    }
}