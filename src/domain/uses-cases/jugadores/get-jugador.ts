import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";

export interface GetJugadorUseCase{
    execute ( id: number ): Promise<JugadorEntity>
}

export class GetJugador implements GetJugadorUseCase{

    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute( id:number ): Promise<JugadorEntity> {
        return this.repository.findById(id);
    }

}