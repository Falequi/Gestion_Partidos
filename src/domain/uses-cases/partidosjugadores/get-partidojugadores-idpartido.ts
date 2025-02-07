import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface GetPartidosJugadoresIdpartidoUseCase {
    execute(id_partido: number): Promise<{ [key: string]: any }>
}

export class GetPartidosJugadoresIdpartido implements GetPartidosJugadoresIdpartidoUseCase {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(id_partido: number): Promise<{ [key: string]: any }> {
        return this.repository.findByIdPartido(id_partido);
    }

}