import $api from "../http";
type DataAdmin = {
    _id: string,
    adminName: string,
    role: string,
    password:string,
    login: string,
}


export default class CreateAdminService {
    static async getAdmins () {
        const admins = await $api.get('/admin/all');
        return admins.data;
    }
    static async getAdmin (id: string) {
        const admin = await $api.get(`/admin/${id}`);
        return admin.data;
    }
    static async createAdmin( adminRole: string, adminLogin: string, adminPassword: string) {
        const response = await $api.post('/admin/create', { adminName: adminLogin , role: adminRole, password: adminPassword });
        return response.data;
    }

    static async updateCategory(id: string, data: Partial<DataAdmin>): Promise<DataAdmin> {
        const response = await $api.put(`/admin/update/${id}`, data);
        return response.data;
    }

    static async deleteAdmin(adminId: string) {
        const response = await $api.delete(`/admin/delete/${adminId}`);
        return response.data;
    }
}