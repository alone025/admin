import axios from "axios";
import $api, { API_URL } from "../http";

interface DiscountData {
    uzName: string;
    uzDescription: string;
    ruName: string;
    ruDescription: string;
    price: string;
    photo: File | null;
}

interface DiscountResponse {
    id: string;
    uzName: string;
    uzDescription: string;
    ruName: string;
    ruDescription: string;
    price: string;
    photoUrl: string;
    // data: {
    //     data: string
    // }
}

export default class DiscountService {
    static async allDiscounts() {
        const discounts = await $api.get('/discount/all');
        return discounts.data
    }

    static async getDiscount(id: string) {
        const discount = await $api.get(`/discount/get/${id}`);
        return discount.data;
    }

    static async createDiscount(discountData: DiscountData) {
        const formData = new FormData();
        formData.append('uzName', discountData.uzName);
        formData.append('uzDescription', discountData.uzDescription);
        formData.append('ruName', discountData.ruName);
        formData.append('ruDescription', discountData.ruDescription);
        formData.append('price', discountData.price);
        if (discountData.photo) {
            formData.append('photo', discountData.photo);
        }

        const response = await axios.post(
            `${API_URL}/discount/create`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        return response.data as DiscountResponse;
    }

    static async deleteDiscount(id: string) {
        const response = await $api.delete(`/discount/delete/${id}`);
        return response.data as { message: string };
    }

    static async editDiscount(id: string, discountData: DiscountData) {
        const formData = new FormData();
        formData.append('uzName', discountData.uzName);
        formData.append('uzDescription', discountData.uzDescription);
        formData.append('ruName', discountData.ruName);
        formData.append('ruDescription', discountData.ruDescription);
        formData.append('price', discountData.price);
        if (discountData.photo) {
            formData.append('photo', discountData.photo);
        }

        const response = await axios.post(
            `${API_URL}/discount/update/${id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        return response.data as DiscountResponse;
    }
}
