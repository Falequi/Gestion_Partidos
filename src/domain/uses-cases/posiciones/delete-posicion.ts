import { PosicionEntity } from "../../entities/posicion.entity";
import { PosicionRepository } from "../../repositories/posicion.repository";

export interface DeletePosicionUseCase{
    execute ( id: number ): Promise<PosicionEntity>
}

export class DeletePosicion implements DeletePosicionUseCase{

    constructor(
        private readonly repository: PosicionRepository,
    ){}

    execute( id: number ): Promise<PosicionEntity> {
        return this.repository.deleteById(id);
    }

}