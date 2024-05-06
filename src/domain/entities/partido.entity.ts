



export class PartidoEntity {

    constructor(
      public id:      number,
      public id_tipo: string,
      public fecha:   string,
      public lugar:   string,
      public hora:    string,

    ) {}
    
    public static fromObject( object: {[key: string]: any} ): PartidoEntity {
            
      const { id,id_tipo, fecha,lugar,hora } = object;

      if ( !id ) throw 'Id is required';
        
      return new PartidoEntity( id, id_tipo,fecha,lugar,hora );
    }
  }
  
  
  