import PersonService from '../../src/application/services/PersonService';
import PersonDBRepository from '../../src/infrastructure/repositories/PersonDBRepository';

jest.mock('../../src/infrastructure/repositories/PersonDBRepository'); // Mockeamos PersonDBRepository

describe('PersonService', () => {
  let personService: PersonService;
  let mockPersonDBRepository: jest.Mocked<PersonDBRepository>;

  // Datos de prueba para las personas
  const personData = {
    nationalIdentity: '710004732',
    name: 'Juan',
    gender: 'male',
    location: 'Lima',
    eyeColor: 'green',
    dateBrith: '2024-10-31',
  };

  beforeEach(() => {
    // Inicializamos el mock para el repositorio
    mockPersonDBRepository = new PersonDBRepository() as jest.Mocked<PersonDBRepository>;
    personService = new PersonService();
    personService['personDBRepository'] = mockPersonDBRepository; // Inyectamos el mock directamente en el servicio
  });

  it('should create and return a new person with a unique id', async () => {
    // Mock de la respuesta de 'create'
    mockPersonDBRepository.create.mockResolvedValueOnce({});

    // Ejecutamos el método addPerson
    const result = await personService.addPerson(personData);

    // Verificamos que el ID generado sea una cadena de texto
    expect(result.id).toEqual(expect.any(String));

    // Verificamos que los datos devueltos sean los esperados
    expect(result.nationalIdentity).toBe(personData.nationalIdentity);
    expect(result.name).toBe(personData.name);
    expect(result.gender).toBe(personData.gender);
    expect(result.location).toBe(personData.location);
    expect(result.eyeColor).toBe(personData.eyeColor);
    expect(result.dateBrith).toBe(personData.dateBrith);

    // Verificamos que el método 'create' haya sido llamado con los datos correctos
    expect(mockPersonDBRepository.create).toHaveBeenCalledWith({
      id: expect.any(String), // El ID debe ser cualquier cadena
      ...personData,
    });
  });

  it('should return all persons from the repository', async () => {
    // Datos simulados para el test
    const mockPersons = [
      { id: '1', nationalIdentity: '123456', name: 'John Doe', gender: 'male', location: 'New York', eyeColor: 'blue', dateBrith: '1990-01-01' },
      { id: '2', nationalIdentity: '789012', name: 'Jane Doe', gender: 'female', location: 'Los Angeles', eyeColor: 'green', dateBrith: '1985-05-15' },
    ];

    // Mock de la respuesta de 'getAll'
    mockPersonDBRepository.getAll.mockResolvedValue(mockPersons);

    // Ejecutamos el método getAll
    const result = await personService.getAll();

    // Verificamos que el resultado tenga la misma estructura que 'mockPersons'
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        nationalIdentity: expect.any(String),
        name: expect.any(String),
        gender: expect.any(String),
        location: expect.any(String),
        eyeColor: expect.any(String),
        dateBrith: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
        nationalIdentity: expect.any(String),
        name: expect.any(String),
        gender: expect.any(String),
        location: expect.any(String),
        eyeColor: expect.any(String),
        dateBrith: expect.any(String),
      })
    ]));
  });
});
