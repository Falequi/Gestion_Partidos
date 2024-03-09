import { PartidoDatasource, PartidoEntity } from "../../domain";
import { CreatePartidoDto, UpdatePartidoDto } from "../../domain/dto";



export class PartidoRepositoryImpl implements PartidoRepositoryImpl {

    constructor(
        private readonly datasource: PartidoDatasource,
      ) { }

    create(createPartidoDto: CreatePartidoDto): Promise<PartidoEntity> {
        return this.datasource.create(createPartidoDto);
    }
    getAll(): Promise<PartidoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<PartidoEntity> {
        return this.datasource.findById( id );
    }
    updateById(updatePartidoDto: UpdatePartidoDto): Promise<PartidoEntity> {
        return this.datasource.updateById( updatePartidoDto);
    }
    deleteById(id: number): Promise<PartidoEntity> {
        return this.datasource.deleteById( id );
    }
    
}


