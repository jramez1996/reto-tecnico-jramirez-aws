
import { StarWarsUser } from './StarWarsUser';

export class PersonStarWas {
    id: string;
    nombre: string;
    altura: string;
    masa: string;
    colorDeCabello: string;
    colorDePiel: string;
    colorDeOjos: string;
    anioDeNacimiento: string;
    genero: string;
    planetaDeOrigen: string;
    peliculas: string[];
    especies: string[];
    vehiculos: string[];
    navesEstelares: string[];
    fechaDeCreacion: string;
    fechaDeEdicion: string;
    url: string;
  
    // Constructor que recibe un objeto "user" que contiene los datos
    constructor(user: StarWarsUser) {
      this.id = user.id;
      this.nombre = user.name;
      this.altura = user.height;
      this.masa = user.mass;
      this.colorDeCabello = user.hair_color;
      this.colorDePiel = user.skin_color;
      this.colorDeOjos = user.eye_color;
      this.anioDeNacimiento = user.birth_year;
      this.genero = user.gender;
      this.planetaDeOrigen = user.homeworld;
      this.peliculas = user.films;
      this.especies = user.species;
      this.vehiculos = user.vehicles;
      this.navesEstelares = user.starships;
      this.fechaDeCreacion = user.created;
      this.fechaDeEdicion = user.edited;
      this.url = user.url;
    }
   
  
    // Método para imprimir un resumen del usuario
    toString(): string {
      return `Persona Star Wars - Nombre: ${this.nombre}, Género: ${this.genero}, Nacido en: ${this.anioDeNacimiento}`;
    }
  }
  
  
  