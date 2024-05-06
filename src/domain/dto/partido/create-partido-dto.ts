

export class CreatePartidoDto {

    private constructor(
        public readonly fecha: string,
        public readonly lugar: string,
        public readonly hora: string,
        public readonly id_tipo: number, 
    ) { }
 
    static create(props: { [key: string]: any }): [string?, CreatePartidoDto?] {

        const { fecha,lugar,hora,id_tipo } = props;

        if (!fecha) return ['Fecha is required', undefined];
        
        return [undefined,
            new CreatePartidoDto( fecha,lugar,hora,id_tipo)];
    }
    
}

