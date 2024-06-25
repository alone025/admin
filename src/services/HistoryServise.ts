import $api from "../http";



export default class HistoryServise {
    static async getOrders () {
        const histories = await $api.get('/histories/all');
        return histories.data;
    }

    static async getOrder(id: string) {
        const history = await $api.get(`/histories/get/${id}`);
        return history.data;
    }
}