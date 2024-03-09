import { Request, Response } from 'express';
import { CreatePartido, DeletePartido, GetPartido, GetPartidos, PartidoRepository, UpdatePartido } from '../../domain';
import { CreatePartidoDto, UpdatePartidoDto } from '../../domain/dto';


export class PartidosController {

  //* DI
  constructor(
    private readonly partidoRepository: PartidoRepository,
  ) { }


  public getPartidos = (req: Request, res: Response) => {

    new GetPartidos(this.partidoRepository)
      .execute()
      .then(partidos => res.json(partidos))
      .catch(error => res.status(400).json({ error }));

  };

  public getPartidoById =  (req: Request, res: Response) => {

    const id = +req.params.id;
    new GetPartido( this.partidoRepository )
      .execute( id )
      .then( todo => res.json( todo ) )
      .catch( error => res.status( 400 ).json( { error } ) );

  };

  public createPartido =  (req: Request, res: Response) => {

    const [error, createPartidoDto] = CreatePartidoDto.create(req.body);
    if (error) return res.status(400).json({ error });

      new CreatePartido( this.partidoRepository )
        .execute( createPartidoDto! )
        .then( jugador => res.json( jugador ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  };

  public updatePartido =  (req: Request, res: Response) => {

    const id = +req.params.id;
    const [error, updatePartidoDto] = UpdatePartidoDto.create({ ...req.body,id});

    if(error) return res.status(400).json({error}); 

      new UpdatePartido( this.partidoRepository )
        .execute( updatePartidoDto! )
        .then( todo => res.json( todo ) )
        .catch( error => res.status( 400 ).json( { error } ) );

  };


  public deletePartido =  (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeletePartido( this.partidoRepository )
        .execute( id )
        .then( todo => res.json( todo ) )
        .catch( error => res.status( 400 ).json( { error } ) );

  };



} 