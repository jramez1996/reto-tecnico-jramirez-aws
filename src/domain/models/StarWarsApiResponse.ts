// src/domain/models/StarWarsApiResponse.ts
import { StarWarsUser } from './StarWarsUser';  // Asegúrate de que esta ruta sea correcta

// Clase para la respuesta completa de la API de Star Wars
export class StarWarsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarWarsUser[];

  // Constructor para inicializar la clase
  constructor(count: number, next: string | null, previous: string | null, results: StarWarsUser[]) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}
