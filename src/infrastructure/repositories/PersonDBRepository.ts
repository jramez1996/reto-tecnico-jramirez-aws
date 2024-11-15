// src/infrastructure/repositories/PersonDBRepository.ts

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface Person {
  id: string;
  nationalIdentity: string;
  name: string;
  gender: string;
  location: string;
  eyeColor: string;
  dateBrith: string;
}

class PersonDBRepository {
  private dynamodb: DocumentClient;

  constructor() {
    // Configuramos DynamoDB para que esté listo para usarse
    this.dynamodb = new DocumentClient();
  }

  // Método para crear una nueva persona en DynamoDB
  async create(person: Person): Promise<DocumentClient.PutItemOutput> {
    try {
      const params: DocumentClient.PutItemInput = {
        TableName: 'Person',  // Nombre de la tabla de DynamoDB
        Item: person,         // Elemento que queremos insertar
      };

      // Realizamos la operación `put` en DynamoDB para agregar la persona
      return await this.dynamodb.put(params).promise();
    } catch (error) {
      console.error("Error al crear la persona:", error);
      throw new Error("Error al crear la persona en la base de datos");
    }
  }

  // Método para obtener todas las personas de DynamoDB
  async getAll(): Promise<Person[]> {
    try {
      const params: DocumentClient.ScanInput = {
        TableName: 'Person',  // Nombre de la tabla de DynamoDB
      };

      const result = await this.dynamodb.scan(params).promise();
      const persons: Person[] = result.Items as Person[];  // Asignamos el resultado a un array de personas
      return persons;
    } catch (error) {
      console.error("Error al obtener todas las personas:", error);
      throw new Error("Error al obtener las personas de la base de datos");
    }
  }
}

export default PersonDBRepository;
