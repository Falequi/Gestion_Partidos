



export class CreatePartidoJugadoresDto {

    private constructor(

        public id_jugador: number,
        public id_partido: number,
        public readonly equipo: string,
        public readonly tarjeta_amarilla: number,
        public readonly tarjeta_roja: number,
        public readonly goles: number,
        public readonly autogoles: number,
        public readonly comentarios: string,
        public readonly calificacion: number,
        public readonly goles_arquero: number,
        public readonly dt_ganador: number,
        public readonly nombre_corto?: string,
        public readonly fecha?: string
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePartidoJugadoresDto?] {


        const { id_jugador, id_partido, equipo,
            tarjeta_amarilla, tarjeta_roja, goles,
            autogoles, comentarios, calificacion,
            goles_arquero, dt_ganador
        } = props;

        if (!id_jugador) return ['id_jugador is required', undefined];
        if (!id_partido) return ['id_partido is required', undefined];
        
        return [undefined,
            new CreatePartidoJugadoresDto(id_jugador, id_partido, equipo,
                tarjeta_amarilla, tarjeta_roja, goles,
                autogoles, comentarios, calificacion,
                goles_arquero, dt_ganador)];
    }

}