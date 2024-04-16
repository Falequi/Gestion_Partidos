



export class PartidoJugadoresEntity {
    constructor(
        public id:              number,
        public id_jugador:      number,
        public id_partido:      number,
        public equipo:          string,
        public tarjeta_amarilla?:number,
        public tarjeta_roja?:    number,
        public goles?:           number,
        public autogoles?:       number,
        public comentarios?:     string,
        public calificacion?:    number,
        public goles_arquero?:   number,
        public dt_ganador?:      number,
        public estado_pago?:     boolean,
    ) { }

    public static fromObject(object: { [key: string]: any }): PartidoJugadoresEntity {
        
        const { id, id_jugador, id_partido, equipo,
            tarjeta_amarilla, tarjeta_roja, goles,
            autogoles, comentarios, calificacion,
            goles_arquero, dt_ganador, estado_pago,
        } = object;

        //if ( !id ) throw 'Id is required';

        return new PartidoJugadoresEntity(
            id, id_jugador, id_partido, equipo,
            tarjeta_amarilla, tarjeta_roja, goles,
            autogoles, comentarios, calificacion,
            goles_arquero, dt_ganador, estado_pago);

    }
}