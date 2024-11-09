class UserTransformer {
    static formatStarWarsResponse(apiResponse) {
      return {
        "total": apiResponse.count, // 'count' -> 'total'
        "nextPage": apiResponse.next, // 'next' -> 'nextPage'
        "previousPage": apiResponse.previous, // 'previous' -> 'previousPage'
        "personas": apiResponse.results.map(user => ({
          "id": user.id, // 'id' permanece igual
          "nombre": user.name, // 'name' -> 'nombre'
          "altura": user.height, // 'height' -> 'altura'
          "masa": user.mass, // 'mass' -> 'masa'
          "colorDeCabello": user.hair_color, // 'hair_color' -> 'colorDeCabello'
          "colorDePiel": user.skin_color, // 'skin_color' -> 'colorDePiel'
          "colorDeOjos": user.eye_color, // 'eye_color' -> 'colorDeOjos'
          "anioDeNacimiento": user.birth_year, // 'birth_year' -> 'anioDeNacimiento'
          "genero": user.gender, // 'gender' -> 'genero'
          "planetaDeOrigen": user.homeworld, // 'homeworld' -> 'planetaDeOrigen'
          "peliculas": user.films, // 'films' -> 'peliculas'
          "especies": user.species, // 'species' -> 'especies'
          "vehiculos": user.vehicles, // 'vehicles' -> 'vehiculos'
          "navesEstelares": user.starships, // 'starships' -> 'navesEstelares'
          "fechaDeCreacion": user.created, // 'created' -> 'fechaDeCreacion'
          "fechaDeEdicion": user.edited, // 'edited' -> 'fechaDeEdicion'
          "url": user.url // 'url' permanece igual
        }))
      };;
    }
  }
  
  module.exports = UserTransformer;

  