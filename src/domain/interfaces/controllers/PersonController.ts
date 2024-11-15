import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'; // Importamos los tipos necesarios de AWS Lambda
import middy from '@middy/core';
import httpJSONBodyParser from '@middy/http-json-body-parser';
import PersonService from '../../../application/services/PersonService'; // Asegúrate de que la ruta sea correcta

const personService = new PersonService();

// Handler para agregar una persona
const addPerson = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Asegúrate de que `event.body` existe y es válido antes de intentar parsearlo

    const { nationalIdentity, name, gender, location, eyeColor, dateBrith } = (JSON.parse(JSON.stringify(event.body ) || '{}'));
    
    // Llamada al servicio para agregar la persona
    const newPerson = await personService.addPerson({ nationalIdentity, name, gender, location, eyeColor, dateBrith });

    return {
      statusCode: 201,
      body: JSON.stringify(newPerson), // Retorna la nueva persona en la respuesta
    };
  } catch (error : any) {
    console.error('Error in addPerson:', error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

// Handler para obtener todas las personas
const getPersons = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const persons = await personService.getAll();

    if (!persons || persons.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Persons not found' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ persons }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error : any) {
    console.error('Error in getPersons:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};

// Aplicamos el middleware de Middy para parsear automáticamente el cuerpo JSON de las peticiones
export const addPersonHandler = middy(addPerson).use(httpJSONBodyParser());
export const getPersonsHandler = getPersons;
