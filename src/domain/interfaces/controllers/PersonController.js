const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");
const PersonService = require("../../../application/services/PersonService");
const personService = new PersonService();
const addPerson = async (event) => {
try {
    const { nationalIdentity, name, gender, location, eyeColor, dateBrith } = event.body;

    const newPerson = await personService.addPerson({ nationalIdentity, name, gender, location, eyeColor, dateBrith });

    return {
    statusCode: 201,
    body: JSON.stringify(event.body),
    };
} catch (error) {
    console.error("Error in addPerson:", error.message); 

    return {
    statusCode: 500,
    body: JSON.stringify({ message: "error Api"}),
    };
}
}
const getPersons = async (event) => {
  try {
    const person = await personService.getAll();
    if (person == undefined || !person || person.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Persons not found" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ person: person }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error in getPersons:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};


module.exports = {
  addPerson: middy(addPerson).use(httpJSONBodyParser()),
  getPersons
};