import { StarWarsApiResponse } from '../../domain/models/StarWarsApiResponse';
import { StarWarsUser } from '../../domain/models/StarWarsUser';
import { PersonStarWas } from '../../domain/models/PersonStarWas';
import { TransformedStarWarsResponse } from '../../domain/models/TransformedStarWarsResponse';

class UserTransformer {
  static formatStarWarsResponse(apiResponse: StarWarsApiResponse): TransformedStarWarsResponse {
    const personas: PersonStarWas[] = apiResponse.results.map((user: StarWarsUser) => {
      return new PersonStarWas(user);
    });

    const transformedResponse = new TransformedStarWarsResponse(
      apiResponse.count,
      apiResponse.next,
      apiResponse.previous,
      personas // Personas vacías, ya que no se están transformando en este punto
    );
    
    return transformedResponse;
  }
}

export default UserTransformer;
