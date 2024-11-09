const AWS = require("aws-sdk");
AWS.config.update({
  region: 'us-east-1' // Reemplaza con la región correcta
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

class PersonDBRepository {
  async create(person) {
    const params = {
      TableName: "Person",
      Item: person,
    };
    return await dynamodb.put(params).promise();
  }

  async getAll() {
    const result = await dynamodb.scan({ TableName: "Person" }).promise();
    const persons = result.Items; 
    return persons;
  }
}

module.exports = PersonDBRepository;
