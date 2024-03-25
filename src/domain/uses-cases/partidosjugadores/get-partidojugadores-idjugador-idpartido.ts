import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface GetPartidosJugadoresIdjugadorIdpartidoUseCase {
    execute(id_jugador: number, id_partido: number): Promise<PartidoJugadoresEntity>
}

export class GetPartidosJugadoresIdjugadorIdpartido implements GetPartidosJugadoresIdjugadorIdpartidoUseCase {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(id_jugador: number, id_partido: number,): Promise<PartidoJugadoresEntity> {
        return this.repository.findByIdJugadorIdPartido(id_jugador, id_partido);
    }

}