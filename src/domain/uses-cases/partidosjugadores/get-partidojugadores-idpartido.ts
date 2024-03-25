import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface GetPartidosJugadoresIdpartidoUseCase {
    execute(id_partido: number): Promise<PartidoJugadoresEntity[]>
}

export class GetPartidosJugadoresIdpartido implements GetPartidosJugadoresIdpartidoUseCase {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(id_partido: number): Promise<PartidoJugadoresEntity[]> {
        return this.repository.findByIdPartido(id_partido);
    }

}