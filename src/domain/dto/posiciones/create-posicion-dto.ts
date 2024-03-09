


export class CreatePosicionDto {

    private constructor (
        public readonly posicion:  string,
        public readonly sigla:     string,
    ){}

    static create( props: {[ key: string]: any}): [string?, CreatePosicionDto?]{

        const { posicion, sigla } = props;

        if(!posicion) return ['Posicion is requiered',undefined]
        if(!sigla) return ['Sigla is requiered',undefined]

        return [undefined, new CreatePosicionDto(posicion,sigla)];
    }

}