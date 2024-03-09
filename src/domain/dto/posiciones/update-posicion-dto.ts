

export class UpdatePosicionDto {

    private constructor(
        public readonly id: number,
        public readonly posicion: string,
        public readonly sigla: string,
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.posicion) returnObj.posicion = this.posicion;
        if (this.sigla) returnObj.sigla = this.sigla;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdatePosicionDto?] {

        const { id,posicion,sigla } = props;
        
        if( !id || isNaN (Number(id))) return ['id must be a valid number'];

        return [undefined,new UpdatePosicionDto(id,posicion,sigla)];
    }

}

