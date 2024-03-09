import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface UpdateAllPartidoJugadoresUseCase{
    execute(partidoJugadores:[{[key:string]:any}]): Promise<PartidoJugadoresEntity[]>;
}

export class UpdateAllPartidoJugadores implements UpdateAllPartidoJugadoresUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute(partidoJugadores:[{[key:string]:any}]): Promise<PartidoJugadoresEntity[]> {

        return this.repository.updateAllJugadoresPartido(partidoJugadores);
    }

}