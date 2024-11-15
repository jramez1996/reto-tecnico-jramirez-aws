import StarWarsHttpClient from '../../infrastructure/http/StarWarsHttpClient';
import UserTransformer from '../transformers/StarWarsTransformers';
import { StarWarsApiResponse } from '../../domain/models/StarWarsApiResponse';

export class StarWarsService {
  private starWarsClient: StarWarsHttpClient;

  constructor() {
    this.starWarsClient = new StarWarsHttpClient();
  }

  async getStarWars(): Promise<any> {
    try {
      const response: StarWarsApiResponse | null = await this.starWarsClient.getStarWars();

      if (response !== null) {
        const formattedResponse = UserTransformer.formatStarWarsResponse(response);
        return formattedResponse;
      } else {
        throw new Error('Star Wars data not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch Star Wars data: ${error.message}`);
      }
    }
  }
}

export default StarWarsService;
