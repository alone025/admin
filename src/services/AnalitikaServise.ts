import $api from "../http";



export default class AnalizServise {
    static async getOrders () {
        const analizs = await $api.get('/analitika/all');
        return analizs.data;
    }

    static async getOrder(id: string) {
        const analiz = await $api.get(`/analitika/get/${id}`);
        return analiz.data;
    }
}