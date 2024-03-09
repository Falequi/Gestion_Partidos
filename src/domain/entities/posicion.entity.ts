



export class PosicionEntity {

    constructor(
      public id:        number,
      public posicion:  string,
      public sigla:     string,
    ) {}
    
    public static fromObject( object: {[key: string]: any} ): PosicionEntity {
      
      const { id,posicion,sigla } = object;

      if ( !id ) throw 'Id is required';
        
      return new PosicionEntity( id,posicion,sigla );
    }
  
  }
  
  
  