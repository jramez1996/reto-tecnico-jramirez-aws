import StarWarsService from '../../src/application/services/StarWarsService';
import StarWarsHttpClient from '../../src/infrastructure/http/StarWarsHttpClient';
import UserTransformer from '../../src/application/transformers/StarWarsTransformers';
import { StarWarsApiResponse } from '../../src/domain/models/StarWarsApiResponse';
import { PersonStarWas } from '../../src/domain/models/PersonStarWas';

import { TransformedStarWarsResponse } from  '../../src/domain/models/TransformedStarWarsResponse';
// Mockeamos las dependencias


import { StarWarsUser } from  '../../src/domain/models/StarWarsUser';

// Mock de las dependencias
jest.mock('../../src/infrastructure/http/StarWarsHttpClient');
jest.mock('../../src/application/transformers/StarWarsTransformers');

describe('StarWarsService', () => {
  let starWarsService: StarWarsService;
  let mockGetStarWars: jest.Mock;
  let mockFormatStarWarsResponse: jest.Mock;

  beforeEach(() => {
    // Instanciar el servicio
    starWarsService = new StarWarsService();

    // Resetear los mocks antes de cada test
    mockGetStarWars = StarWarsHttpClient.prototype.getStarWars as jest.Mock;
    mockFormatStarWarsResponse = UserTransformer.formatStarWarsResponse as jest.Mock;
  });

  it('should return formatted response when data is fetched successfully', async () => {
    // Datos de ejemplo que el cliente HTTP devolvería
    let starWarsUser: StarWarsUser[] = [];
    const mockApiResponse: StarWarsApiResponse = {
      count: 1,
      next: null,
      previous: null,
      results: starWarsUser,
    };

    // Mock de la respuesta del cliente HTTP
    mockGetStarWars.mockResolvedValue(mockApiResponse);
    let personas12: PersonStarWas[] = [];

    const mockTransformedResponse: TransformedStarWarsResponse = {
      total: 1,
      nextPage: null,
      previousPage: null,
      personas: personas12,
      getTotalPersonas: function() {
        return this.total;
      },
      getNextPage: function() {
        return this.nextPage;
      },
      addPersona: function(persona: PersonStarWas) {
        this.personas.push(persona);
      }
    };
    mockFormatStarWarsResponse.mockReturnValue(mockTransformedResponse);

    // Llamar al método que estamos probando
    const result = await starWarsService.getStarWars();

    // Verificar que la respuesta sea la esperada
    expect(result).toEqual(mockTransformedResponse);
    expect(mockGetStarWars).toHaveBeenCalledTimes(1);
    expect(mockFormatStarWarsResponse).toHaveBeenCalledWith(mockApiResponse);
  });

  it('should throw an error if no data is found', async () => {
    // Mock de la respuesta del cliente HTTP (nulo)
    mockGetStarWars.mockResolvedValue(null);

    // Llamar al método que estamos probando y verificar que lanza un error
    await expect(starWarsService.getStarWars()).rejects.toThrow('Star Wars data not found');
  });

  it('should throw an error if an error occurs while fetching data', async () => {
    // Mock de la respuesta del cliente HTTP (fallo)
    mockGetStarWars.mockRejectedValue(new Error('API error'));

    // Llamar al método que estamos probando y verificar que lanza un error
    await expect(starWarsService.getStarWars()).rejects.toThrow('Failed to fetch Star Wars data: API error');
  });

  it('should handle unknown errors gracefully', async () => {
    // Mock de la respuesta del cliente HTTP (causar un error desconocido)
    mockGetStarWars.mockImplementation(() => {
      throw new Error('Unknown error');
    });

    // Llamar al método que estamos probando y verificar que lanza un error
    await expect(starWarsService.getStarWars()).rejects.toThrow('Failed to fetch Star Wars data');
  });
});
