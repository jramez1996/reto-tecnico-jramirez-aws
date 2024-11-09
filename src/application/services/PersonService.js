const PersonDBRepository = require("../../infrastructure/repositories/PersonDBRepository");
class PersonService {
  constructor() {
    this.personDBRepository = new PersonDBRepository();
  }

  async addPerson(personData) {
    const newPerson = {
      id: Date.now().toString(), // Genera un ID único simple (puedes cambiar esto)
      ...personData,
    };

    await this.personDBRepository.create(newPerson);
    return newPerson;
  }

  async getAll() {
    const persons = await this.personDBRepository.getAll();
    return persons;
  }



}

module.exports = PersonService;
