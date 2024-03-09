import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface GetPartidosJugadoresUseCase {
    execute(): Promise<PartidoJugadoresEntity[]>
}

export class GetPartidosJugadores implements GetPartidosJugadoresUseCase {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(): Promise<PartidoJugadoresEntity[]> {
        return this.repository.getAll();
    }

}