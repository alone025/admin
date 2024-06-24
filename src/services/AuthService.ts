import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(adminName: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {adminName, password})
    }

    static async logout(): Promise<void> {
        return $api.get('/auth/logout')
    }
}

