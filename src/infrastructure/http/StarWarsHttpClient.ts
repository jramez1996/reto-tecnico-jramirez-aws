import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import { StarWarsApiResponse } from '../../domain/models/StarWarsApiResponse';

// Cargar las variables de entorno
dotenv.config();

class StarWarsHttpClient {
  private apiBaseUrl: string;
  private client: AxiosInstance;

  constructor() {
    // Validación de que la variable de entorno está definida
    const apiBaseUrl = process.env.USER_API_BASE_URL;
    
    if (!apiBaseUrl) {
      throw new Error("USER_API_BASE_URL is not defined in the environment variables.");
    }
    this.apiBaseUrl = apiBaseUrl;  // Aquí ya estamos seguros de que apiBaseUrl no es undefined

    // Crear instancia de Axios con configuración predeterminada
    this.client = axios.create({
      baseURL: this.apiBaseUrl,
      timeout: 5000, // Tiempo de espera de la solicitud
    });

    // Configuración de interceptores para manejar respuestas y errores globales
    this.setupInterceptors();
  }

  // Método para configurar interceptores globales
  private setupInterceptors() {
    // Interceptor para manejar las respuestas
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error); // Rechazamos la promesa para manejarlo más arriba si es necesario
      }
    );
  }

  // Método para obtener datos de Star Wars
  async getStarWars(): Promise<StarWarsApiResponse | null> {
    try {
      const response: AxiosResponse<StarWarsApiResponse> = await this.client.get(`/people/?page=1`);
      return response.data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error fetching Star Wars data:', error);
      return null; // En caso de error, retornamos null
    }
  }

  // Método de manejo de errores
  private handleError(error: AxiosError): void {
    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error('No response received:', error.request);
    } else {
      // Otro tipo de error
      console.error('Request setup error:', error.message);
    }
  }
}

export default StarWarsHttpClient;
