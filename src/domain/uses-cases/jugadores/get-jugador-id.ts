import { JugadorRepository } from "../../repositories/jugador.repository";

export interface GetJugadorIdUseCase{
    execute ( nombre_corto: string ): Promise<number>
}

export class GetJugadorId implements GetJugadorIdUseCase{

    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute( nombre_corto: string ): Promise<number> {
        return this.repository.findIdByName(nombre_corto);
    }

}