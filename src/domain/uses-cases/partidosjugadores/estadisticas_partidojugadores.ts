import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";


export interface asistenciaPartidosUsesCases {
    execute(): Promise<{ nombre_corto: string, numero_asistencias: number }[]>
}
export interface calificacionPorPartidoJugadorUsesCases {
    execute(fecha: string): Promise<{ nombre_corto: string, calificacion: number }[]>
}
export interface goleadorUsesCases {
    execute(): Promise<{ nombre_corto: string, goles: number }[]>
}
export interface goleadorPorPartidoUsesCases {
    execute(fecha: string): Promise<{ nombre_corto: string, goles: number }[]>
}
export interface partidoGanadosComoDtUsesCases {
    execute(): Promise<{ nombre_corto: string, partidos_ganados_dt: number }[]>
}
export interface partidoGanadosPorJugadorUsesCases {
    execute(): Promise<{ nombre_corto: string, partidos_ganados_jugador: number }[]>
}
export interface vayaMenosVencidaUsesCases {
    execute(): Promise<{ nombre_corto: string, goles_encajados: number }[]>
}
export interface tarjetasAmarillasUsesCases {
    execute(): Promise<{ nombre_corto: string, tarjetas_amarillas: number }[]>
}
export interface tarjetasRojasUsesCases {
    execute(): Promise<{ nombre_corto: string, tarjetas_rojas: number }[]>
}

export interface partidosMarcadorUsesCases {
    execute(): Promise<{ [key: string]: any }[]>;
}

export class AsistenciaPartidos implements asistenciaPartidosUsesCases {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(): Promise<{nombre_corto: string, numero_asistencias: number}[]> {
        return this.repository.asistenciaPartidos();
    }
}

export class CalificacionPorPartidoJugador implements calificacionPorPartidoJugadorUsesCases {
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }
    execute(fecha: string): Promise<{nombre_corto: string, calificacion: number}[]> {
        return this.repository.calificacionPorPartidoJugador(fecha);
    }
}

export class Goleador implements goleadorUsesCases {
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }
    execute(): Promise<{ nombre_corto: string, goles: number }[]> {
        return this.repository.goleador();
    }
}

export class GoleadorPorPartido implements goleadorPorPartidoUsesCases {
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }
    execute(fecha: string): Promise<{ nombre_corto: string, goles: number }[]> {
        return this.repository.goleadorPorPartido(fecha);
    }
}

export class PartidosGanadosComoDT implements partidoGanadosComoDtUsesCases{
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}
    execute(): Promise<{ nombre_corto: string, partidos_ganados_dt: number }[]> {
       return this.repository.partidoGanadosComoDt();
    }
}

export class PartidosGanadosPorJugador implements partidoGanadosPorJugadorUsesCases{
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}
    execute(): Promise<{ nombre_corto: string, partidos_ganados_jugador: number }[]> {
        return this.repository.partidoGanadosPorJugador();
    }
}

export class VayaMenosVencida implements vayaMenosVencidaUsesCases{
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}
    execute(): Promise<{ nombre_corto: string, goles_encajados: number }[]> {
       return this.repository.vayaMenosVencida();
    }
}

export class TarjetasAmarillas implements tarjetasAmarillasUsesCases{
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}
    execute(): Promise<{ nombre_corto: string, tarjetas_amarillas: number }[]> {
       return this.repository.tarjetasAmarillas();
    }
}

export class TarjetasRojas implements tarjetasRojasUsesCases{
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}
    execute(): Promise<{ nombre_corto: string, tarjetas_rojas: number }[]> {
        return this.repository.tarjetasRojas();
    }
}

export class PartidosMarcador implements partidosMarcadorUsesCases{
    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}
    execute(): Promise<{ [key: string]: any; }[]> {
        return this.repository.partidoMarcadores();
    }
}









