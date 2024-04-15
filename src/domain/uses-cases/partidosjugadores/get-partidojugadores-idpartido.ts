import { PartidoJugadoresRepository } from "../../repositories/partidojugadores.repository";

export interface GetPartidosJugadoresIdpartidoUseCase {
    execute(id_partido: number): Promise<{ numero:number, nombre_corto: string }[]>
}

export class GetPartidosJugadoresIdpartido implements GetPartidosJugadoresIdpartidoUseCase {

    constructor(
        private readonly repository: PartidoJugadoresRepository,
    ) { }

    execute(id_partido: number): Promise<{ numero:number, nombre_corto: string }[]> {
        return this.repository.findByIdPartido(id_partido);
    }

}