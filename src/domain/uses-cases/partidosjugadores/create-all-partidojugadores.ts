import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface CreateAllPartidoJugadoresUseCase{
    execute ( partidoJugadores:[{[key:string]:any}]): Promise<{mesage:string}>
}

export class CreateAllPartidoJugadores implements CreateAllPartidoJugadoresUseCase{

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ){}

    execute(partidoJugadores:[{[key:string]:any}]): Promise<{mesage:string}> {

        return this.repository.createAll(partidoJugadores);
    }

}