// src/domain/models/Person.ts

export class Person {
  public nationalIdentity: string;
  public name: string;
  public gender: string;
  public location: string;
  public eyeColor: string;
  public dateBrith: Date;

  // Identificador único para la entidad (por ejemplo, un ID generado)
  private _id: string;

  constructor(
    nationalIdentity: string,
    name: string,
    gender: string,
    location: string,
    eyeColor: string,
    dateBrith: Date,
    id?: string // Si no se proporciona un ID, se genera uno automáticamente
  ) {
    this.nationalIdentity = nationalIdentity;
    this.name = name;
    this.gender = gender;
    this.location = location;
    this.eyeColor = eyeColor;
    this.dateBrith = dateBrith;

    // Si no se proporciona un ID, generamos uno automáticamente
    this._id = id || this.generateId();
    
    // Validaciones o reglas de negocio pueden ir aquí
    this.validate();
  }

  // Getter para el ID
  get id(): string {
    return this._id;
  }

  // Método para generar un ID único (simple en este caso, puedes usar otro enfoque)
  private generateId(): string {
    return Date.now().toString(); // Genera un ID basado en el timestamp
  }

  // Aquí puedes agregar validaciones específicas para la entidad
  private validate(): void {
    if (!this.nationalIdentity) {
      throw new Error('National Identity is required');
    }

    if (!this.name) {
      throw new Error('Name is required');
    }

    // Asegurarse de que la fecha de nacimiento sea válida
    if (this.dateBrith > new Date()) {
      throw new Error('Date of birth cannot be in the future');
    }

    // Otras validaciones si son necesarias
  }

  // Métodos adicionales relacionados con la entidad pueden ir aquí
  // Por ejemplo, métodos de negocio como calcular la edad o formatear la fecha de nacimiento
  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.dateBrith);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

