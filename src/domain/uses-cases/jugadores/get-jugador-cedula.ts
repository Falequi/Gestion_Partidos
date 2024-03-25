import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";


export interface GetJugadorCedulaUseCase{
    execute ( cedula: string): Promise<JugadorEntity>
}

export class GetJugadorCedula implements GetJugadorCedulaUseCase {
    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute( cedula: string ): Promise<JugadorEntity> {
        return this.repository.findByCedula(cedula)
    }

}