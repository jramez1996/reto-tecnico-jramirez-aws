const { expect } = require("chai");
const sinon = require("sinon");
const PersonService = require("../src/application/services/PersonService");
const { addPerson, getPersons } = require("../src/domain/interfaces/controllers/PersonController");

describe("Person Controller", () => {
  let personServiceMock;

  beforeEach(() => {
    // Creamos el mock de PersonService
    personServiceMock = {
      addPerson: sinon.stub(),
      getAll: sinon.stub() // Asegúrate de mockear el método getAll
    };

    // Aquí estamos asegurando que el controlador usa el mock
    PersonService.prototype.addPerson = personServiceMock.addPerson;
    PersonService.prototype.getAll = personServiceMock.getAll;
  });

  afterEach(() => {
    sinon.restore(); // Limpiar mocks después de cada prueba
  });

  describe("addPerson", () => {
    it("should return 201 when person is added successfully", async () => {
      const event = {
        body: {
          "nationalIdentity": "710004732",
          "name": "juan",
          "gender": "male",
          "location": "lima",
          "eyeColor": "Green",
          "dateBrith": "20241031"
        }
      };

      personServiceMock.addPerson.resolves(event.body); // Simula la respuesta exitosa

      const response = await addPerson(event);
      expect(response.statusCode).to.equal(201);
      expect(JSON.parse(response.body)).to.deep.equal(event.body);
    });

    it("should return 500 when there is an error adding a person", async () => {
      const event = { body: null };
      personServiceMock.addPerson.rejects(new Error("Error adding person"));

      const response = await addPerson(event);
      expect(response.statusCode).to.equal(500);
      console.log("response",JSON.parse(response.body));
      expect(JSON.parse(response.body).message).to.equal("Internal server error");
    });
  });

  describe("getPersons", () => {
    it("should return 200 when persons are found", async () => {
      const mockPersons = [{
        "dateBrith": "19BBY",
        "eyeColor": "brown",
        "gender": "female",
        "id": "1731144317182",
        "location": "Alderaan",
        "name": "Leia Organa",
        "nationalIdentity": "123456"
      }];

      personServiceMock.getAll.resolves(mockPersons); // Simula la respuesta exitosa

      const event = {};
      const response = await getPersons(event);

      expect(response.statusCode).to.equal(200);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('person').that.is.an('array');
      expect(body.person.length).to.be.greaterThan(0);
    });

    it("should return 500 when there is an error retrieving persons", async () => {
      const event = {};

      // Simula un error en getAll (rechaza la promesa)
      personServiceMock.getAll.rejects(new Error("Error retrieving persons"));

      const response = await getPersons(event);

      // Verifica que el código de estado sea 500
      expect(response.statusCode).to.equal(500);

      // Verifica que la respuesta contenga el mensaje de error
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message').that.is.a('string');
      expect(body.message).to.equal("Internal server error");
    });
  });
});
