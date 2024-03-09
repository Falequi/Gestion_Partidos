import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface GetPartidoJugadoresUseCase{
    execute ( id: number ): Promise<PartidoJugadoresEntity>
}

export class GetPartidoJugador implements GetPartidoJugadoresUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute( id:number ): Promise<PartidoJugadoresEntity> {
        return this.repository.findById(id);
    }

}