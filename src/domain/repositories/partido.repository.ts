
import { CreatePartidoDto, UpdatePartidoDto } from '../dto';
import { PartidoEntity } from '../entities/partido.entity';



export abstract class PartidoRepository {

  
  //todo: paginación
  abstract getAll(): Promise<PartidoEntity[]>;
  
  abstract findById(id: number): Promise<PartidoEntity>;
  abstract create(createPartidoDto: CreatePartidoDto): Promise<PartidoEntity>;
  abstract updateById(updatePartidoDto: UpdatePartidoDto): Promise<PartidoEntity>;
  abstract deleteById(id: number): Promise<PartidoEntity>;

}