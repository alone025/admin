import $api from "../http";


export default class CostumerService  {
    static async getCostumers () {
        const costumers = await $api.get('/users/all');
        return costumers.data;
    }

    static async search(q: string) {
        const costumers = await $api.get(`/users/search?q=${q}`);
        return costumers.data;
    }
}