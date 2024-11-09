const axios = require('axios');
require('dotenv').config();
class StarWarsHttpClient {
    constructor() {
        this.apiBaseUrl = process.env.USER_API_BASE_URL; // URL base de la API externa
        this.client = axios.create({
            baseURL: this.apiBaseUrl,
            timeout: 5000, // Tiempo de espera para las solicitudes
        });
    }

    async getStarWars() {
        try {
            const response = await this.client.get(`${this.apiBaseUrl}1`);
            return response.data; // Retorna los datos del usuario
        } catch (error) {
            this.handleError(error);
        }
    }


}

module.exports =  StarWarsHttpClient;
