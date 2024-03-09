import { PartidoEntity } from "../../entities/partido.entity";
import { PartidoRepository } from "../../repositories/partido.repository";

export interface GetPartidosUseCase {
    execute(): Promise<PartidoEntity[]>
}

export class GetPartidos implements GetPartidosUseCase {

    constructor(
        private readonly repository: PartidoRepository,
    ) { }

    execute(): Promise<PartidoEntity[]> {
        return this.repository.getAll();
    }

}