import axios from "axios";
import $api, { API_URL } from "../http";




export default class DiscountService {
    static async allDiscounts() {
        const discounts = await $api.get('/discount/all');
        return discounts
    }

    static async getDiscount(id: string) {
        const discount = await $api.get(`/discount/get/${id}`);
        return discount.data
    }


    static async createDiscount(uzName: string, uzDescription: string, ruName: string, ruDescription: string, price: string, photo: File | null) {
        const response = await axios.post(
            `${API_URL}/discount/create`,
            { uzName, uzDescription, ruName, ruDescription, price, photo },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        return response.data
    }

    static async deleteDiscount(id: string) {
        const response = await $api.delete(`/discount/delete/${id}`);
        return response.data
    }

    static async editDiscount(id: string, data: any) {
        console.log(data);
        

        const response = await axios.post(
            `${API_URL}/discount/update/${id}`,
            data,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        return response.data;
    }    
}