import { UpdatePosicionDto } from "../../dto";
import { PosicionEntity } from "../../entities/posicion.entity";
import { PosicionRepository } from "../../repositories/posicion.repository";



export interface UpdatePosicionUseCase{
    execute( dto: UpdatePosicionDto):Promise<PosicionEntity>
}

export class UpdatePosicion implements UpdatePosicionUseCase{

    constructor(
        private readonly repository: PosicionRepository,
    ){}

    execute(dto: UpdatePosicionDto): Promise<PosicionEntity> {
        return this.repository.updateById(dto);
    }

}