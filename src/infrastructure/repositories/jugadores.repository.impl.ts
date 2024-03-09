import { JugadorDatasource, JugadorEntity, JugadorRepository } from "../../domain";
import { CreateJugadorDto, UpdateJugadorDto } from "../../domain/dto";



export class JugadorRepositoryImpl implements JugadorRepository {

    constructor(
        private readonly datasource: JugadorDatasource,
      ) { }

    findIdByName(nombre_corto: string): Promise<number> {
        return this.datasource.findIdByName(nombre_corto);
    }

    create(createJugadorDto: CreateJugadorDto): Promise<JugadorEntity> {
        return this.datasource.create(createJugadorDto);
    }
    getAll(): Promise<JugadorEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<JugadorEntity> {
        return this.datasource.findById( id );
    }
    updateById(updateTodoDto: UpdateJugadorDto): Promise<JugadorEntity> {
        return this.datasource.updateById( updateTodoDto);
    }
    deleteById(id: number): Promise<JugadorEntity> {
        return this.datasource.deleteById( id );
    }
    
}


