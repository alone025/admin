import axios from "axios";
import $api, { API_URL } from "../http";



export default class ProductService {
    static async createProduct(
        name: string,
        description: string,
        ruName: string,
        ruDescription: string,
        category: string,
        subCategory: string,
        price: string,
        photo: File | null
    ) {
        const response = await axios.post(`${API_URL}/products/create`,
            { uzName: name, uzDescription: description, ruName, ruDescription, category, subCategory, price, photo },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    }

    static async createCategory(categoryName: string, categoryRuName: string) {
        const response = await $api.post('/categories/create', { uz: { name: categoryName }, ru: { name: categoryRuName } });
        return response.data.data
    }

    static async createSubCategory(subCategoryName: string, subCategoryRuName: string, categoryId: string) {
        const response = await $api.post('/sub-categories/create', { uz: { name: subCategoryName }, ru: { name: subCategoryRuName }, categoryId: categoryId });
        return response.data.data
    }


    static async getCategories() {
        const response = await $api.get('/categories/all');
        return response.data
    }

    static async getSubCategories() {
        const response = await $api.get('/sub-categories/all');
        return response.data;
    }

    static async getProducts() {
        const response = await $api.get('/products/all');
        return response.data;
    }

    static async deleteCategory(categoryId: string) {
        const response = await $api.delete(`/categories/delete/${categoryId}`);
        return response.data;
    }

    static async deleteSubCategory(subCategory: string) {
        const response = await $api.delete(`/sub-categories/delete/${subCategory}`);
        return response.data
    }

    static async deleteProduct(product: string) {
        const response = await $api.delete(`/products/delete/${product}`);
        return response.data;
    }

    // functions for update
    static async updateCategory(id: string, data: any) {
        const response = await $api.put(`categories/update/${id}`, data);
        return response.data
    }

    static async updateProduct(
        id: string,
        name: string,
        description: string,
        ruName: string,
        ruDescription: string,
        category: string,
        subCategory: string,
        price: string,
        photo: File | null
    ) {
        const response = await axios.put(
            `${API_URL}/products/update/${id}`,
            { uzName: name, uzDescription: description, ruName, ruDescription, category, subCategory, price, photo },
            { headers: { "Content-Type": 'multipart/form-data' } 
        });
        return response.data;
    }

    static async updateSubCategory(id: string, data: any) {
        const response = await $api.put(`sub-categories/update/${id}`, data);
        return response.data
    }

    static async getCategory(productId: string) {
        const response = await $api.get(`/categories/get/${productId}`);
        return response.data;
    }

    static async getSubCategory(productId: string) {
        const response = await $api.get(`/sub-categories/get/${productId}`);
        return response.data;
    }

    static async getProduct(productId: string) {
        const response = await $api.get(`/products/get/${productId}`);
        return response.data;
    }

}