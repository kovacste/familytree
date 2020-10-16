import { Service } from "./Service";

class LoginService extends Service {

    login(username, password) {
        console.log(username, password)
        return new Promise((resolve) => {
            resolve({
                data: {
                    loginNev: 'kovacs.elod',
                    nev: 'Kovács Előd',
                    id: 1
                }
            })
        });
        /*return this.get('', {
            loginName: username,
            password: password
        })*/
    }
}

export const loginService = new LoginService('/api/');