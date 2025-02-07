import { CreatePartidoJugadoresDto } from "../../dto";
import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface CreatePartidoJugadoresIdJugadorIdPartidoUseCase{
    execute ( dto: CreatePartidoJugadoresDto): Promise<PartidoJugadoresEntity>
}

export class CreatePartidoJugadoresIdJugadorIdPartido implements CreatePartidoJugadoresIdJugadorIdPartidoUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute(dto: CreatePartidoJugadoresDto): Promise<PartidoJugadoresEntity> {

        return this.repository.createIdjugadorIdpartido(dto);
    }

}