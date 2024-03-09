

export class CreatePartidoDto {

    private constructor(
        public readonly fecha: string,
        public readonly lugar: string,
        public readonly hora: string,
    ) { }
 
    static create(props: { [key: string]: any }): [string?, CreatePartidoDto?] {

        const { fecha,lugar,hora } = props;

        if (!fecha) return ['Fecha is required', undefined];

        return [undefined,
            new CreatePartidoDto( fecha,lugar,hora)];
    }
    
}

