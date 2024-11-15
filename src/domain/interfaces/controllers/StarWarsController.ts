// StarWarsController.ts
import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import { StarWarsService } from '../../../application/services/StarWarsService';

const starWarsService = new StarWarsService();

// Handler de Lambda
const getStarWars = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const startWast = await starWarsService.getStarWars();

    if (!startWast) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "StarWars not found" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ startWast }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error: any) {
    console.error(error);  // Para fines de depuración

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error: error.message }),
      headers: { "Content-Type": "application/json" },
    };
  }
};

// Usando Middy para envolver la función Lambda
const handler = middy(getStarWars);

// Exportar el handler para AWS Lambda
export { handler };
