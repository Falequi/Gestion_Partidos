import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";

export interface GetJugadoresUseCase {
    execute(): Promise<JugadorEntity[]>
}

export class GetJugadores implements GetJugadoresUseCase {

    constructor(
        private readonly repository: JugadorRepository,
    ) { }

    execute(): Promise<JugadorEntity[]> {
        return this.repository.getAll();
    }

}