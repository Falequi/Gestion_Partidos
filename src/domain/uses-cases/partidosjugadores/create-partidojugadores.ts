import { CreatePartidoJugadoresDto } from "../../dto";
import { PartidoJugadoresEntity } from "../../entities/partidojugadores.entity";
import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface CreatePartidoJugadoresUseCase{
    execute ( dto: CreatePartidoJugadoresDto,nombre_corto: string, fecha: string): Promise<PartidoJugadoresEntity>
}

export class CreatePartidoJugadores implements CreatePartidoJugadoresUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute(dto: CreatePartidoJugadoresDto, nombre_corto: string, fecha: string): Promise<PartidoJugadoresEntity> {

        return this.repository.create(dto, nombre_corto, fecha);
    }

}