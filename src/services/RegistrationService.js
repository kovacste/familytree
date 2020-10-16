import { Service } from "./Service";

class RegistrationService extends Service {

    register(username, password) {
        return this.get('', {
            loginName: username,
            password: password
        })
    }
}

export const registrationService = new RegistrationService('/api/');