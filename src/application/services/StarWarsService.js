const StarWarsHttpClient = require("../../infrastructure/http/StarWarsHttpClient");
const StarWarsTransformers = require("../transformers/StarWarsTransformers");
class  StarWarsService {
    constructor() {
        this.starWarsClient = new StarWarsHttpClient();
    }

    async getStarWars() {
        try {
            const data = await this.starWarsClient.getStarWars();
            const formattedResponse = StarWarsTransformers.formatStarWarsResponse(data);
            return formattedResponse; // Retorna los datos obtenidos del cliente
        } catch (error) {
            throw new Error(`Failed to fetch Star Wars data: ${error.message}`);
        }
    }
}
module.exports = StarWarsService;

