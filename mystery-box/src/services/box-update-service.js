import { post } from '../data/crud';

class postBoxService {
    constructor() {
        this.baseUrl = 'http://localhost:5000';
        this.boxUrl = `${this.baseUrl}/box`;
    }

    box(data) {
        return post(this.boxUrl, data)
    }
}

export default postBoxService;