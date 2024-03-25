import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface DeletePartidoJugadoresIdjugadorIdPartidoUseCase {
    execute(id_jugador: number, id_partido: number): Promise<{ numero_registros: number }>
}

export class DeletePartidoJugadoresIdjugadorIdPartido implements DeletePartidoJugadoresIdjugadorIdPartidoUseCase {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(id_jugador: number, id_partido: number): Promise<{ numero_registros: number }> {
        return this.repository.deleteByIdJugadorIdPartido(id_jugador, id_partido);
    }

}