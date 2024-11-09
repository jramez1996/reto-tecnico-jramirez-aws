const middy = require("@middy/core");
const StarWarsService = require("../../../application/services/StarWarsService");
const starWarsService = new StarWarsService();
const getStarWars = async (event) => {
  try {
    const startWast = await starWarsService.getStarWars();
    if (!startWast) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "StartWas not found" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ startWast:startWast }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", event }), // Devuelve event aquí también si lo deseas
      headers: {
        "Content-Type": "application/json",
      },/**/
    };
  }

};


module.exports = {
  getStarWars
};