import { Edad } from './calcular-edad';


export class CreateJugadorDto {

    private constructor(
        public readonly nombres: string,
        public readonly apellidos: string,
        public readonly nombre_corto: string,
        public readonly cedula: string,
        public readonly RH: string,
        public readonly telefono: string,
        public readonly email: string,
        public readonly talla_camiseta: string,
        public readonly fecha_nacimiento: string,
        public readonly estado: boolean,
        public readonly tipo: string,
        public id_telegram?: string,
        public readonly edad?: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateJugadorDto?] {

        const { nombres, apellidos, nombre_corto, cedula,
            RH, telefono, email, talla_camiseta, fecha_nacimiento, estado, tipo } = props;

        if (!fecha_nacimiento) return ['Fecha de Nacimiento is required', undefined];

        props.edad = Edad.calcular(fecha_nacimiento);
        props.id_telegram = null;

        if (!tipo) props.tipo = 'integrante';

        const { edad, id_telegram } = props;


        return [undefined,
            new CreateJugadorDto(nombres, apellidos, nombre_corto, cedula, RH,
                telefono, email, talla_camiseta, fecha_nacimiento, estado, props.tipo,
                id_telegram, edad)];
    }

}

