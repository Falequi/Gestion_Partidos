import { UpdatePartidoJugadoresDto } from "../../dto";
import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface UpdatePartidoJugadoresUseCase{
    execute ( dto: UpdatePartidoJugadoresDto): Promise<PartidoJugadoresEntity>
}

export class UpdatePartidoJugadores implements UpdatePartidoJugadoresUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute(dto: UpdatePartidoJugadoresDto): Promise<PartidoJugadoresEntity> {
        return this.repository.updateById(dto);
    }

}