import { PosicionEntity } from "../../entities/posicion.entity";
import { PosicionRepository } from "../../repositories/posicion.repository";



export interface GetPosicionGetUseCase {
    execute(id:number):Promise<PosicionEntity>
}

export class GetPosicion implements GetPosicionGetUseCase{

    constructor(
        private readonly repository: PosicionRepository,
    ){}
    

    execute(id: number): Promise<PosicionEntity> {
        return this.repository.findById(id);
    };

}