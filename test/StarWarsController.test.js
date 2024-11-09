const { expect } = require("chai");
const sinon = require("sinon");//application/services/StarWarsService
const StarWarsService = require("../src/application/services/StarWarsService");  // Asegúrate de que la ruta sea correcta
const { getStarWars } = require("../src/domain/interfaces/controllers/StarWarsController"); 
describe("StarWars Controller", () => {
  let starWarsServiceMock;

  beforeEach(() => {
    // Creamos un mock para StarWarsService
    starWarsServiceMock = {
      getStarWars: sinon.stub()
    };

    // Asignamos el mock a la instancia de StarWarsService
    StarWarsService.prototype.getStarWars = starWarsServiceMock.getStarWars;
  });

  afterEach(() => {
    sinon.restore(); // Limpiar los mocks después de cada prueba
  });

  describe("getStarWars", () => {
    it("should return 200 when data is found", async () => {
      const mockStarWarsData = {
        name: "Luke Skywalker",
        role: "Jedi Knight",
        planet: "Tatooine"
      };

      // Simulamos que `getStarWars` devuelve datos correctamente
      starWarsServiceMock.getStarWars.resolves(mockStarWarsData);

      const event = {}; // Si no necesitas parámetros específicos en el evento, lo dejamos vacío
      const response = await getStarWars(event);
      console.log("response:",response);
      // Verificamos que el código de estado sea 200
      expect(response.statusCode).to.equal(200);

      // Verificamos que el cuerpo de la respuesta contiene los datos correctos
      const body = JSON.parse(response.body);
      expect(body).to.have.property("startWast").that.deep.equals(mockStarWarsData);
    });

    it("should return 404 when data is not found", async () => {
      // Simulamos que `getStarWars` no devuelve nada (null o undefined)
      starWarsServiceMock.getStarWars.resolves(null);

      const event = {};
      const response = await getStarWars(event);

      // Verificamos que el código de estado sea 404
      expect(response.statusCode).to.equal(404);

      // Verificamos que el mensaje de error sea "StartWas not found"
      const body = JSON.parse(response.body);
      expect(body).to.have.property("message").that.equals("StartWas not found");
    });

    it("should return 500 when there is an internal server error", async () => {
      const event = {};

      // Simulamos un error al intentar obtener datos
      starWarsServiceMock.getStarWars.rejects(new Error("Error fetching Star Wars data"));

      const response = await getStarWars(event);

      // Verificamos que el código de estado sea 500
      expect(response.statusCode).to.equal(500);

      // Verificamos que el mensaje de error sea "Internal server error"
      const body = JSON.parse(response.body);
      expect(body).to.have.property("message").that.equals("Internal server error");
    });
  });
});
