import { get } from '../data/crud';

class getBoxService {
    constructor() {
        this.baseUrl = 'http://localhost:5000';
        this.boxUrl = `${this.baseUrl}/box`;
    }

    box() {
        return get(this.boxUrl)
    }
}

export default getBoxService;