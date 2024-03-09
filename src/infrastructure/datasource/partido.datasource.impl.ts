import { prisma } from '../../data/postgres';
import { PartidoDatasource, PartidoEntity } from '../../domain';
import { CreatePartidoDto, UpdatePartidoDto } from '../../domain/dto';


export class PartidoDatasourceImpl implements PartidoDatasource {

  async create(createPartidoDto: CreatePartidoDto): Promise<PartidoEntity> {

    const partido = await prisma.partido.create({
      data: createPartidoDto!
    });

    return PartidoEntity.fromObject(partido);
  }

  async getAll(): Promise<PartidoEntity[]> {

    const partidos = await prisma.partido.findMany();

    return partidos.map(jugador => PartidoEntity.fromObject(jugador));
  }

  async findById(id: number): Promise<PartidoEntity> {

    const partido = await prisma.partido.findFirst({
      where: { id }
    });

    if (!partido) throw `Partido with id ${id} not found`;

    return PartidoEntity.fromObject(partido);
  }

  async updateById(updatePartidoDto: UpdatePartidoDto): Promise<PartidoEntity> {

    await this.findById(updatePartidoDto.id);

    const updatedPartido = await prisma.partido.update({
      where: { id: updatePartidoDto.id },
      data: updatePartidoDto!.values
    });

    return PartidoEntity!.fromObject(updatedPartido);
  }

  async deleteById(id: number): Promise<PartidoEntity> {

    await this.findById(id);

    const deletedPartido = await prisma.partido.delete({
      where: { id }
    });

    return PartidoEntity.fromObject(deletedPartido);
  }




}

