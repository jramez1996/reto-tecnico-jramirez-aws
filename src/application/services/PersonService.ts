// src/services/PersonService.ts

//import PersonDBRepository from '../../infrastructure/repositories/PersonDBRepository';
import PersonDBRepository from '../../infrastructure/repositories/PersonDBRepository';


interface PersonData {
  nationalIdentity: string;
  name: string;
  gender: string;
  location: string;
  eyeColor: string;
  dateBrith: string;
}

interface Person extends PersonData {
  id: string;
}

class PersonService {
  private personDBRepository: PersonDBRepository;

  constructor() {
    this.personDBRepository = new PersonDBRepository();
  }

  // Método para agregar una nueva persona
  async addPerson(personData: PersonData): Promise<Person> {
    // Crear un nuevo objeto con un id único (en este caso, usando el timestamp)
    const newPerson: Person = {
      id: Date.now().toString(), // Genera un ID único simple, puedes cambiar esto a otro sistema de IDs.
      ...personData,
    };

    // Llamada al repositorio para guardar la persona en la base de datos
    await this.personDBRepository.create(newPerson);
    // Retorna la nueva persona agregada
    return newPerson;
  }

  // Método para obtener todas las personas
  async getAll(): Promise<Person[]> {
    // Obtiene todas las personas del repositorio
    const persons: Person[] = await this.personDBRepository.getAll();
    return persons;
  }
}

export default PersonService;
