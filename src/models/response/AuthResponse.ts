import { IUser } from "../IUser";

export interface AuthResponse {
    data: {
        accessToken: string;
        refreshToken: string;
        admin: IUser;
    }
}
