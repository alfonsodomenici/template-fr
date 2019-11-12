import RestService from "./RestService.js";


export default class TestService extends RestService {

    constructor() {
        super();
        this.url +=  '/posts';
    }

    async all({start, pageSize}) {
        return await this._getJsonData(`${this.url}?_start=${start}&_limit=${pageSize}`);
    }

    async find(id){
        return await this._getJsonData(`${this.url}/${id}`);
    }

}