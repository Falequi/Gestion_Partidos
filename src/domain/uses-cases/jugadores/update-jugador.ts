import { UpdateJugadorDto } from "../../dto";
import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";

export interface UpdateJugadorUseCase{
    execute ( dto: UpdateJugadorDto): Promise<JugadorEntity>
}

export class UpdateJugador implements UpdateJugadorUseCase{

    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute(dto: UpdateJugadorDto): Promise<JugadorEntity> {
        return this.repository.updateById(dto);
    }

}