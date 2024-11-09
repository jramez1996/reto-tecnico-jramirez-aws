class Person {
    //nationalIdentity, name, gender, location, eyeColor, dateBrith
    constructor(nationalIdentity, name, gender, location, eyeColor, dateBrith) {
      this.nationalIdentity = nationalIdentity;
      this.name = name;
      this.location = location;
      this.gender = gender;
      this.eyeColor = eyeColor;
      this.dateBrith = dateBrith;
      // Aquí podrías agregar validaciones o reglas de negocio
    }
  }
  
  module.exports = Person;