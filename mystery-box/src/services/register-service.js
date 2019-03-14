import { post } from '../data/crud';

class RegisterService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/auth';
        this.signupUrl = `${this.baseUrl}/signup`;
    }

    login(credentials) {
        return post(this.signupUrl, credentials)
    }
}

export default RegisterService;