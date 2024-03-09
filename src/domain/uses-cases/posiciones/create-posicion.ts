
import { CreatePosicionDto } from "../../dto";
import { PosicionEntity } from "../../entities/posicion.entity";
import { PosicionRepository } from "../../repositories/posicion.repository";



export interface CreatePosicionUseCase{
    execute ( dto: CreatePosicionDto): Promise<PosicionEntity>
}

export class CreatePosicion implements CreatePosicionUseCase{

    constructor(
        private readonly repository: PosicionRepository,
    ){}

    execute(dto: CreatePosicionDto): Promise<PosicionEntity> {
        return this.repository.create(dto);
    }

}