




export class UpdatePartidoJugadoresDto {

    private constructor(
        public readonly id: number,
        public readonly id_jugador: number,
        public readonly id_partido: number,
        public readonly equipo: string,
        public readonly tarjeta_amarilla: number,
        public readonly tarjeta_roja: number,
        public readonly goles: number,
        public readonly autogoles: number,
        public readonly comentarios: string,
        public readonly calificacion: number,
        public readonly goles_arquero: number,
        public readonly dt_ganador: number,
        public readonly estado_pago: boolean,
        
    ) { }

    get values() {  

        const returnObj: { [key: string]: any } = {};

        if (this.id_jugador) returnObj.id_jugador               = this.id_jugador
        if (this.id_partido) returnObj.id_partido               = this.id_partido
        if (this.equipo) returnObj.equipo                       = this.equipo
        if (this.tarjeta_amarilla) returnObj.tarjeta_amarilla   = this.tarjeta_amarilla
        if (this.tarjeta_roja) returnObj.tarjeta_roja           = this.tarjeta_roja
        if (this.goles) returnObj.goles                         = this.goles
        if (this.autogoles) returnObj.autogoles                 = this.autogoles
        if (this.comentarios) returnObj.comentarios             = this.comentarios
        if (this.calificacion) returnObj.calificacion           = this.calificacion
        if (this.goles_arquero) returnObj.goles_arquero         = this.goles_arquero
        if (this.dt_ganador) returnObj.dt_ganador               = this.dt_ganador
        if (this.estado_pago) returnObj.estado_pago             = this.estado_pago

        // console.log(returnObj)

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdatePartidoJugadoresDto?] {

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