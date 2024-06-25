import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import ProductService from "../services/ProductService";

export default class Store {
  admin: IUser = {} as IUser;
  isAuth: boolean = false;
  isLoading: boolean = false;
  categories: object[] = [];
  subCategories: object[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  setUser(admin: IUser): void {
    this.admin = admin;
  }

  setLoading(bool: boolean): void {
    this.isLoading = bool;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.data.admin);
    } catch (e: any) {
      console.log(e.response?.data?.data.message);
    }
  }

  async logout(): Promise<void> {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth(): Promise<void> {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh`,
        { withCredentials: true }
      );
      console.log(response);
      localStorage.setItem("token", response.data.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.data.admin);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
