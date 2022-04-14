import axios from "axios";

export default class ServiceBase {
    apiUrl = "https://localhost:7119/api/"
    constructor() {
        let service = axios.create({
            baseURL: this.apiUrl,
        });
        this.service = service;
    }
}