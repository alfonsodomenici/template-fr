import RestService from "./RestService.js";


export default class TestService extends RestService {

    constructor() {
        super();
        this.url +=  '/posts';
    }

    async all({user,start, pageSize}) {
        if(user){
            return await this._getJsonData(`${this.url}?userId=${user}&_start=${start}&_limit=${pageSize}`);
        }else{
            return await this._getJsonData(`${this.url}?_start=${start}&_limit=${pageSize}`);
        }
        
    }

    async find(id){
        return await this._getJsonData(`${this.url}/${id}`);
    }

    async create(json){
        return await this._postJsonData(`${this.url}`);
    }
    async update(json){
        return await this._putJsonData(`${this.url}/${json.id}`);
    }

    async delete(json){
        return await this._deleteJsonData(`${this.url}/${json.id}`);
    }

}