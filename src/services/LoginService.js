import { Service } from "./Service";

class LoginService extends Service {

    login({ email, password }) {
        return this.get('api/User/AuthenticateUser?', {
            email,
            password,
        });
    }
}

export const loginService = new LoginService('/api/');