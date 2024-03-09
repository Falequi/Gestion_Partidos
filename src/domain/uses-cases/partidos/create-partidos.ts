import { CreatePartidoDto } from "../../dto";
import { PartidoEntity } from "../../entities/partido.entity";
import { PartidoRepository } from "../../repositories/partido.repository";

export interface CreatePartidoUseCase{
    execute ( dto: CreatePartidoDto): Promise<PartidoEntity>
}

export class CreatePartido implements CreatePartidoUseCase{

    constructor(
        private readonly repository: PartidoRepository,
    ){}

    execute(dto: CreatePartidoDto): Promise<PartidoEntity> {
        return this.repository.create(dto);
    }

}