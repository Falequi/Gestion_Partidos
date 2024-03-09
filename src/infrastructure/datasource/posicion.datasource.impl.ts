import { prisma } from '../../data/postgres';
import { PosicionDatasource, PosicionEntity } from '../../domain';
import { CreatePosicionDto, UpdatePosicionDto } from '../../domain/dto';




export class PosicionDatasourceImpl implements PosicionDatasource {

  async create(createPosicionDto: CreatePosicionDto): Promise<PosicionEntity> {

    const posicion = await prisma.posicion.create({
      data: createPosicionDto!
    });

    return PosicionEntity.fromObject( posicion );
  }

  async getAll(): Promise<PosicionEntity[]> {

    const posiciones = await prisma.posicion.findMany();

    return posiciones.map( posicion => PosicionEntity.fromObject(posicion));

  }
  async findById(id: number): Promise<PosicionEntity> {
    const posicion = await prisma.posicion.findFirst({
      where: { id }
    });

    if( !posicion ) throw `Posicion with id ${id} not found`;

    return PosicionEntity.fromObject(posicion);
    
  }
  async updateById(updatePosicionDto: UpdatePosicionDto): Promise<PosicionEntity> {

    await this.findById(updatePosicionDto.id);
    
    const updatedPosicion = await prisma.posicion.update({
      where: { id: updatePosicionDto.id },
      data: updatePosicionDto!.values
    });
    
    return PosicionEntity!.fromObject(updatedPosicion);
    
  }
  
  async deleteById(id: number): Promise<PosicionEntity> {

    
    await this.findById(id);

    const deletePosicion = await prisma.posicion.delete({
      where: { id }
    });

    return PosicionEntity.fromObject(deletePosicion);

    
    
  }

  

}

