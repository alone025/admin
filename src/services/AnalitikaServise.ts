import $api from "../http";



export default class AnalizServise {
    static async getOrders () {
        const analizs = await $api.get('/analiytics/top');
        return analizs.data;
    }

    static async getOrder(id: string) {
        const analiz = await $api.get(`/analitika/get/${id}`);
        return analiz.data;
    }

    static async getExel() {
        const analiz = await $api.get(`/analiytics/excel/top-costumers`);
        return analiz.data;
    }
}