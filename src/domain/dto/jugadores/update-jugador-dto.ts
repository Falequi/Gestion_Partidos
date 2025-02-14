import { Edad } from "./calcular-edad";


export class UpdateJugadorDto {

    private constructor(
        public readonly id: number,
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
        public readonly id_telegram?: string,
        public readonly edad?: number,
        public readonly socio?: boolean,
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.nombres != undefined) returnObj.nombres = this.nombres;
        if (this.apellidos != undefined) returnObj.apellidos = this.apellidos;
        if (this.nombre_corto != undefined) returnObj.nombre_corto = this.nombre_corto;
        if (this.cedula != undefined) returnObj.cedula = this.cedula;
        if (this.RH != undefined) returnObj.RH = this.RH;
        if (this.telefono != undefined) returnObj.telefono = this.telefono;
        if (this.email != undefined) returnObj.email = this.email;
        if (this.talla_camiseta != undefined) returnObj.talla_camiseta = this.talla_camiseta;
        if (this.fecha_nacimiento != undefined) returnObj.fecha_nacimiento = this.fecha_nacimiento;
        if (this.estado != undefined) returnObj.estado = this.estado;
        if (this.tipo != undefined) returnObj.tipo = this.tipo;
        if (this.id_telegram != undefined) returnObj.id_telegram = this.id_telegram;
        if (this.socio != undefined) returnObj.socio = this.socio;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateJugadorDto?] {

        const { id,nombres, apellidos, nombre_corto, cedula,
            RH, telefono, email, talla_camiseta, fecha_nacimiento,estado,tipo,id_telegram,socio } = props;
        
            let newfechanacimiento = new Date();

        if( !id || isNaN (Number(id))) return ['id must be a valid number'];

        if (fecha_nacimiento) {
            newfechanacimiento = new Date(fecha_nacimiento)
            if(newfechanacimiento.toString() === 'Invalid Date'){
                return ['fecha_nacimiento must be a valid date'];
            }
        }

        props.edad = Edad.calcular(fecha_nacimiento);

        if ( isNaN(props.edad))  props.edad = undefined;

        const { edad } = props;

        return [undefined,
            new UpdateJugadorDto(id,nombres, apellidos, nombre_corto, cedula, RH,
                telefono, email, talla_camiseta, fecha_nacimiento,estado,tipo,id_telegram,
                edad,socio)];
    }

}

