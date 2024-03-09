import { PartidoEntity } from "../../entities/partido.entity";
import { PartidoRepository } from "../../repositories/partido.repository";

export interface DeletePartidoUseCase{
    execute ( id: number ): Promise<PartidoEntity>
}

export class DeletePartido implements DeletePartidoUseCase{

    constructor(
        private readonly repository: PartidoRepository,
    ){}

    execute( id: number ): Promise<PartidoEntity> {
        return this.repository.deleteById(id);
    }

}