import { CreateJugadorDto } from "../../dto";
import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";

export interface CreateJugadorUseCase{
    execute ( dto: CreateJugadorDto): Promise<JugadorEntity>
}

export class CreateJugador implements CreateJugadorUseCase{

    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute(dto: CreateJugadorDto): Promise<JugadorEntity> {
        return this.repository.create(dto);
    }

}