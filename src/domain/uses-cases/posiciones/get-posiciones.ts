import { PosicionEntity } from "../../entities/posicion.entity";
import { PosicionRepository } from "../../repositories/posicion.repository";


export interface GetPosicionesUseCase {
    execute(): Promise<PosicionEntity[]>
}

export class GetPosiciones implements GetPosicionesUseCase{

    constructor(
        private readonly repository: PosicionRepository,
    ){}

    execute(): Promise<PosicionEntity[]> {
        return this.repository.getAll();
    }

}