import { UpdatePartidoDto } from "../../dto";
import { PartidoEntity } from "../../entities/partido.entity";
import { PartidoRepository } from "../../repositories/partido.repository";

export interface UpdatePartidoUseCase{
    execute ( dto: UpdatePartidoDto): Promise<PartidoEntity>
}

export class UpdatePartido implements UpdatePartidoUseCase{

    constructor(
        private readonly repository: PartidoRepository,
    ){}

    execute(dto: UpdatePartidoDto): Promise<PartidoEntity> {
        return this.repository.updateById(dto);
    }

}