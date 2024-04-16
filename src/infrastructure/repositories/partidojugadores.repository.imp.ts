import { PartidoJugadoresDatasource } from '../../domain/datasource/partidosjugadores.datasource';
import { CreatePartidoJugadoresDto, UpdatePartidoJugadoresDto } from '../../domain/dto';
import { PartidoJugadoresEntity } from '../../domain/entities/partidojugadores.entity';
import { PartidoJugadoresRepository } from '../../domain/repositories/partidojugadores.repository';

export class PartidoJugadoresRepositoryImp implements PartidoJugadoresRepository {

    constructor(
        private readonly datasource: PartidoJugadoresDatasource,
    ) { }
    findByIdPartido(id_partido: number): Promise<{ numero:number, nombre_corto: string }[]> {
        return this.datasource.findByIdPartido(id_partido);
    }
    
    findByIdJugadorIdPartido(id_jugador: number, id_partido: number): Promise<PartidoJugadoresEntity> {
        return this.datasource.findByIdJugadorIdPartido(id_jugador, id_partido);
    }

    deleteByIdJugadorIdPartido(id_jugador: number, id_partido: number): Promise<{ numero_registros: number }> {
        return this.datasource.deleteByIdJugadorIdPartido(id_jugador, id_partido);
    }
    createIdjugadorIdpartido(createPartidoJugadoresDto: CreatePartidoJugadoresDto): Promise<PartidoJugadoresEntity> {
        return this.datasource.createIdjugadorIdpartido(createPartidoJugadoresDto);
    }
    goleadorPorPartido(fecha: string): Promise<{ nombre_corto: string; goles: number; }[]> {
        return this.datasource.goleadorPorPartido(fecha);
    }
    partidoGanadosComoDt(): Promise<{ nombre_corto: string; partidos_ganados_dt: number; }[]> {
        return this.datasource.partidoGanadosComoDt();
    }
    partidoGanadosPorJugador(): Promise<{ nombre_corto: string; partidos_ganados_jugador: number; }[]> {
        return this.datasource.partidoGanadosPorJugador();
    }
    vayaMenosVencida(): Promise<{ nombre_corto: string; goles_encajados: number; }[]> {
        return this.datasource.vayaMenosVencida();
    }
    tarjetasAmarillas(): Promise<{ nombre_corto: string; tarjetas_amarillas: number; }[]> {
        return this.datasource.tarjetasAmarillas();
    }
    tarjetasRojas(): Promise<{ nombre_corto: string; tarjetas_rojas: number; }[]> {
        return this.datasource.tarjetasRojas();
    }
    goleador(): Promise<{ nombre_corto: string; goles: number; }[]> {
        return this.datasource.goleador();
    }
    asistenciaPartidos(): Promise<{ nombre_corto: string; numero_asistencias: number; }[]> {
        return this.datasource.asistenciaPartidos();
    }
    calificacionPorPartidoJugador(fecha: string): Promise<{ nombre_corto: string, calificacion: number }[]> {
        return this.datasource.calificacionPorPartidoJugador(fecha);
    }
    updateAllJugadoresPartido(partidoJugadores: [{ [key: string]: any; }]): Promise<PartidoJugadoresEntity[]> {
        return this.datasource.updateAllJugadoresPartido(partidoJugadores);
    }
    createAll(partidoJugadores: [{ [key: string]: any; }]): Promise<{ mesage: string }> {
        return this.datasource.createAll(partidoJugadores);
    }
    getAll(): Promise<PartidoJugadoresEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<PartidoJugadoresEntity> {
        return this.datasource.findById(id);
    }
    create(createPartidoJugadoresDto: CreatePartidoJugadoresDto, nombre_corto: string, fecha: string): Promise<PartidoJugadoresEntity> {
        return this.datasource.create(createPartidoJugadoresDto, nombre_corto, fecha);
    }
    updateById(updatePartidoJugadoresDto: UpdatePartidoJugadoresDto): Promise<PartidoJugadoresEntity> {
        return this.datasource.updateById(updatePartidoJugadoresDto);
    }
    deleteById(id: number): Promise<PartidoJugadoresEntity> {
        return this.datasource.deleteById(id);
    }

}