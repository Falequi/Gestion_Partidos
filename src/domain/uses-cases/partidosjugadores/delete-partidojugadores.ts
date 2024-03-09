import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface DeletePartidoJugadoresUseCase{
    execute ( id: number ): Promise<PartidoJugadoresEntity>
}

export class DeletePartidoJugadores implements DeletePartidoJugadoresUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute( id: number ): Promise<PartidoJugadoresEntity> {
        return this.repository.deleteById(id);
    }

}