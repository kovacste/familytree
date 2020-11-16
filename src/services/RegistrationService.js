import { Service } from "./Service";

class RegistrationService extends Service {

    register(
        {
            id,
            email,
            password,
            firstName,
            lastName,
            birthDay,
            birthPlace,
            imageUrl,
        }
        ) {
        return this.post('api/User/SetUser', {
            id,
            email,
            password,
            firstName,
            lastName,
            birthDay,
            birthPlace,
            imageUrl,
        });
    }
}

export const registrationService = new RegistrationService('/api/');