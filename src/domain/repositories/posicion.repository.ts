
import { CreatePosicionDto, UpdatePosicionDto } from '../dto';
import { PosicionEntity } from '../entities/posicion.entity';



export abstract class PosicionRepository {

  
  //todo: paginación
  abstract getAll(): Promise<PosicionEntity[]>;
  
  abstract findById(id: number): Promise<PosicionEntity>;
  abstract create(createPosicionDto: CreatePosicionDto): Promise<PosicionEntity>;
  abstract updateById(updatePosicionDto: UpdatePosicionDto): Promise<PosicionEntity>;
  abstract deleteById(id: number): Promise<PosicionEntity>;

}