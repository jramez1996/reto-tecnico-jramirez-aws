import { StarWarsUser } from './StarWarsUser';

import { PersonStarWas } from './PersonStarWas';

export class TransformedStarWarsResponse {
  total: number;
  nextPage: string | null;
  previousPage: string | null;
  personas: PersonStarWas[];

  constructor(total: number, nextPage: string | null, previousPage: string | null, personas: PersonStarWas[] = []) {
    this.total = total;
    this.nextPage = nextPage;
    this.previousPage = previousPage;
    this.personas = personas;
  }

  // Implementación de los métodos
  getTotalPersonas(): number {
    return this.total;
  }

  getNextPage(): string | null {
    return this.nextPage;
  }

  addPersona(persona: PersonStarWas): void {
    this.personas.push(persona);
  }
}
