



export class JugadorEntity {

  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public nombre_corto: string,
    public cedula: string,
    public RH: string,
    public telefono: string,
    public correo: string,
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
      correo, talla_camiseta, fecha_nacimiento, estado, tipo, id_telegram, edad, socio,
    } = object;


    if (!id) throw 'Id is required';

    return new JugadorEntity(
      id, nombres, apellidos, nombre_corto, cedula, RH, telefono,
      correo, talla_camiseta, fecha_nacimiento, estado, tipo, id_telegram, edad, socio
    );
  }

}


