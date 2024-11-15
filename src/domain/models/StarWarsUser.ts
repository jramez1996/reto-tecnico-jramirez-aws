// src/domain/models/StarWarsUser.ts

export class StarWarsUser {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
    // Constructor para inicializar todas las propiedades
    constructor(
      id: string,
      name: string,
      height: string,
      mass: string,
      hair_color: string,
      skin_color: string,
      eye_color: string,
      birth_year: string,
      gender: string,
      homeworld: string,
      films: string[],
      species: string[],
      vehicles: string[],
      starships: string[],
      created: string,
      edited: string,
      url: string
    ) {
      this.id = id;
      this.name = name;
      this.height = height;
      this.mass = mass;
      this.hair_color = hair_color;
      this.skin_color = skin_color;
      this.eye_color = eye_color;
      this.birth_year = birth_year;
      this.gender = gender;
      this.homeworld = homeworld;
      this.films = films;
      this.species = species;
      this.vehicles = vehicles;
      this.starships = starships;
      this.created = created;
      this.edited = edited;
      this.url = url;
    }
  
    // Método para obtener información de la persona en formato legible
    getBasicInfo(): string {
      return `${this.name} (Born: ${this.birth_year}, Gender: ${this.gender}, Homeworld: ${this.homeworld})`;
    }
  
    // Puedes agregar otros métodos que puedan ser útiles, como por ejemplo para calcular la altura en metros si es necesario
    getHeightInMeters(): string {
      const heightInMeters = (parseFloat(this.height) / 100).toFixed(2);
      return `${heightInMeters} meters`;
    }
  }
  