import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";


export interface Euser {
  response: {
    data: {
      data: {
        message: string;
      };
    };
  };
}


export default class Store {
  admin = {} as IUser;
  isAuth = false;
  isLoading = false;
  categories = [];
  subCategories = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(admin: IUser) {
    this.admin = admin;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {


      // const userDataPromise: Promise<Adm[]> = CreateAdminService.getAdmins();
      // userDataPromise.then((userData: Adm[]) => {
      //   console.log(userData);
      // });
      
      // console.log(userDataPromise);
      
      // userDataPromise.then((userData: Adm[]) => {
      //   const userExists = userData.some(
      //     (user) => user.adminName === email && user.password === password
      //   );
      
      //   if (userExists) {
      //     localStorage.setItem("loginTrueAccept", "tasdiqlandi");
      //     this.setAuth(true);
      //   }
      // });
  
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("refreshtoken", response.data.data.refreshToken);
      localStorage.setItem("loginTrueAccept", "tasdiqlandi");
      this.setAuth(true);
      this.setUser(response.data.data.admin)

     
    } catch (e) {
      console.log("Store ts da login da muammo");
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("loginTrueAccept");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log("Logout da problema");
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      console.log("Hello");
      if (localStorage.getItem("loginTrueAccept")) {
        this.setAuth(true);
      }

      console.log("3-qator");

      // const response = await $api.get<AuthResponse>("/auth/refresh");
    } catch (e) {
      console.log("Ishlamadi store.ts");
    } finally {
      this.setLoading(false);
    }
  }
}
