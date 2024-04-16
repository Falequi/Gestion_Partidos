




export class UpdatePartidoJugadoresDto {


    private constructor(
        public readonly id: number,
        public readonly id_jugador: number,
        public readonly id_partido: number,
        public readonly equipo: string,
        public readonly tarjeta_amarilla?: number,
        public readonly tarjeta_roja?: number,
        public readonly goles?: number,
        public readonly autogoles?: number,
        public readonly comentarios?: string,
        public readonly calificacion?: number,
        public readonly goles_arquero?: number,
        public readonly dt_ganador?: number,
        public estado_pago?: boolean,

    ) { }

    get values() {

        console.log("dto. values");
        console.log("estado pago ", this.estado_pago)
        console.log("tarjeta roja ", this.tarjeta_roja)
        const returnObj: { [key: string]: any } = {};

        if (this.id_jugador != undefined) returnObj.id_jugador = this.id_jugador
        if (this.id_partido != undefined) returnObj.id_partido = this.id_partido
        if (this.equipo != undefined) returnObj.equipo = this.equipo
        if (this.tarjeta_amarilla != undefined) returnObj.tarjeta_amarilla = this.tarjeta_amarilla
        if (this.tarjeta_roja != undefined) { returnObj.tarjeta_roja = this.tarjeta_roja }
        if (this.goles != undefined) returnObj.goles = this.goles
        if (this.autogoles != undefined) returnObj.autogoles = this.autogoles
        if (this.comentarios != undefined) returnObj.comentarios = this.comentarios
        if (this.calificacion != undefined) returnObj.calificacion = this.calificacion
        if (this.goles_arquero != undefined) returnObj.goles_arquero = this.goles_arquero
        if (this.dt_ganador != undefined) returnObj.dt_ganador = this.dt_ganador
        if (this.estado_pago != undefined) returnObj.estado_pago = this.estado_pago

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdatePartidoJugadoresDto?] {

        console.log("dto. create")

        const { id, id_jugador, id_partido, equipo,
            tarjeta_amarilla, tarjeta_roja, goles,
            autogoles, comentarios, calificacion,
            goles_arquero, dt_ganador, estado_pago
        } = props;

        return [undefined,
            new UpdatePartidoJugadoresDto(id, id_jugador, id_partido, equipo,
                tarjeta_amarilla, tarjeta_roja, goles,
                autogoles, comentarios, calificacion,
                goles_arquero, dt_ganador, estado_pago)];
    }

}