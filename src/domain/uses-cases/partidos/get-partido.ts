import { PartidoEntity } from "../../entities/partido.entity";
import { PartidoRepository } from "../../repositories/partido.repository";

export interface GetPartidoUseCase{
    execute ( id: number ): Promise<PartidoEntity>
}

export class GetPartido implements GetPartidoUseCase{

    constructor(
        private readonly repository: PartidoRepository,
    ){}

    execute( id:number ): Promise<PartidoEntity> {
        return this.repository.findById(id);
    }

}