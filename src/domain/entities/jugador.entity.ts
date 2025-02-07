



export class JugadorEntity {

  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public nombre_corto: string,
    public cedula: string,
    public RH: string,
    public telefono: string,
    public email: string,
    public talla_camiseta: string,
    public fecha_nacimiento: Date,
    public estado: boolean,
    public tipo: string,
    public id_telegram?: string,
    public edad?: number,
    public socio?: boolean,
  ) { }

  public static fromObject(object: { [key: string]: any }): JugadorEntity {


    const { id, nombres, apellidos, nombre_corto, cedula, RH, telefono,
      email, talla_camiseta, fecha_nacimiento, estado, tipo, id_telegram, edad,
      socio,
    } = object;


    if (!id) throw 'id is required';
    if (!nombres) throw 'nombres is required';
    if (!apellidos) throw 'apellidos is required';
    if (!nombre_corto) throw 'nombre_corto is required';
    if (!cedula) throw 'cedula is required';
    //if (!RH) throw 'RH is required';
    //if (!telefono) throw 'telefono is required';
    if (!talla_camiseta) throw 'talla_camiseta is required';
    if (!fecha_nacimiento) throw 'fecha_nacimiento is required';
    //if (!email) throw 'email is required';

    return new JugadorEntity(
      id, nombres, apellidos, nombre_corto, cedula, RH, telefono,
      email, talla_camiseta, fecha_nacimiento, estado, tipo, id_telegram, edad, socio
    );
  }

}


