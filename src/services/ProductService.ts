import axios from "axios";
import $api, { API_URL } from "../http";

interface Category {
    _id: string;
    uz: { name: string };
    ru: { name: string };
}

interface SubCategory {
    _id: string;
    uz: { name: string };
    ru: { name: string };
    category: { _id: string; uz: { name: string } };
    categoryId: string | null;
  }
  

interface Product {
    _id: string;
    uzName: string;
    uzDescription: string;
    ruName: string;
    ruDescription: string;
    category: string;
    subCategory: string;
    price: string;
    photoUrl: string;
}

// interface ProductData {
//     uzName: string;
//     uzDescription: string;
//     ruName: string;
//     ruDescription: string;
//     category: string;
//     subCategory: string;
//     price: string;
//     photo: File | null;
// }

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
    ): Promise<Product> {
        const response = await axios.post(`${API_URL}/products/create`,
            { uzName: name, uzDescription: description, ruName, ruDescription, category, subCategory, price, photo },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    }

    static async createCategory(categoryName: string, categoryRuName: string): Promise<Category> {
        const response = await $api.post('/categories/create', { uz: { name: categoryName }, ru: { name: categoryRuName } });
        return response.data;
    }

    static async createSubCategory(subCategoryName: string, subCategoryRuName: string, categoryId: string): Promise<SubCategory> {
        const response = await $api.post('/sub-categories/create', { uz: { name: subCategoryName }, ru: { name: subCategoryRuName }, categoryId });
        return response.data;
    }

    static async getCategories(){
        const response = await $api.get('/categories/all');
        return response.data;
    }

    static async getSubCategories() {
        const response = await $api.get('/sub-categories/all');
        return response.data;
    }

    static async getProducts() {
        const response = await $api.get('/products/all');
        return response.data;
    }

    static async deleteCategory(categoryId: string): Promise<{ message: string }> {
        const response = await $api.delete(`/categories/delete/${categoryId}`);
        return response.data;
    }

    static async deleteSubCategory(subCategoryId: string): Promise<{ message: string }> {
        const response = await $api.delete(`/sub-categories/delete/${subCategoryId}`);
        return response.data;
    }

    static async deleteProduct(productId: string): Promise<{ message: string }> {
        const response = await $api.delete(`/products/delete/${productId}`);
        return response.data;
    }

    static async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
        const response = await $api.put(`categories/update/${id}`, data);
        return response.data;
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
    ): Promise<Product> {
        const response = await axios.put(
            `${API_URL}/products/update/${id}`,
            { uzName: name, uzDescription: description, ruName, ruDescription, category, subCategory, price, photo },
            { headers: { "Content-Type": 'multipart/form-data' } }
        );
        return response.data;
    }

    static async updateSubCategory(id: string, data: Partial<SubCategory>): Promise<SubCategory> {
        const response = await $api.put(`sub-categories/update/${id}`, data);
        return response.data;
    }

    static async getCategory(categoryId: string) {
        const response = await $api.get(`/categories/get/${categoryId}`);
        return response.data;
    }

    static async getSubCategory(subCategoryId: string) {
        const response = await $api.get(`/sub-categories/get/${subCategoryId}`);
        return response.data;
    }

    static async getProduct(productId: string) {
        const response = await $api.get(`/products/get/${productId}`);
        return response.data;
    }
}
