import { JugadorEntity } from "../../entities/jugador.entity";
import { JugadorRepository } from "../../repositories/jugador.repository";


export interface GetJugadorIdTelegramUseCase{
    execute ( id_telegram: string): Promise<JugadorEntity | boolean>
}

export class GetJugadorIdTelegram implements GetJugadorIdTelegramUseCase {
    constructor(
        private readonly repository: JugadorRepository,
    ){}

    execute( id_telegram: string ): Promise<JugadorEntity | boolean> {
        return this.repository.findByIdTelegram(id_telegram)
    }

}