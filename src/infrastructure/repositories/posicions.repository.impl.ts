import { JugadorDatasource, JugadorEntity, JugadorRepository, PosicionDatasource, PosicionEntity, PosicionRepository } from "../../domain";
import { CreateJugadorDto, CreatePosicionDto, UpdateJugadorDto, UpdatePosicionDto } from "../../domain/dto";



export class PosicionRepositoryImpl implements PosicionRepository {

    constructor(
        private readonly datasource: PosicionDatasource
    ){}

    create(createPosicionDto: CreatePosicionDto): Promise<PosicionEntity> {
        return this.datasource.create(createPosicionDto)
    }
    getAll(): Promise<PosicionEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<PosicionEntity> {
        return this.datasource.findById( id );
    }
    updateById(updatePosicionDto: UpdatePosicionDto): Promise<PosicionEntity> {
        return this.datasource.updateById( updatePosicionDto );
    }
    deleteById(id: number): Promise<PosicionEntity> {
        return this.datasource.deleteById( id );
    }

    
    
}


