import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";

export interface DeleteJugadorUseCase{
    execute ( id: number ): Promise<JugadorEntity>
}

export class DeleteJugador implements DeleteJugadorUseCase{

    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute( id: number ): Promise<JugadorEntity> {
        return this.repository.deleteById(id);
    }

}