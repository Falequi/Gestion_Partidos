import { Request, Response } from 'express';
import { JugadorRepository } from '../../domain';
import { CreateJugadorDto, UpdateJugadorDto } from '../../domain/dto';


export class JugadoresController {

  //* DI
  constructor(
    private readonly jugadorRepository: JugadorRepository,
  ) { }


  public getJugadores = async (req: Request, res: Response) => {

    const jugadores = await this.jugadorRepository.getAll();
    return res.json(jugadores);

  };

  public getJugadorById = async (req: Request, res: Response) => {

    const id = +req.params.id;
    try {

      const jugador = await this.jugadorRepository.findById( id );

      res.json(jugador);

    } catch (error) {

      res.status(400).json({error});
    }
  };

  public createJugador = async (req: Request, res: Response) => {

    const [error, createJugadorDto] = CreateJugadorDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const jugador = await this.jugadorRepository.create(createJugadorDto!);

    res.json(jugador);

    //   new CreateTodo( this.todoRepository )
    //     .execute( createTodoDto! )
    //     .then( todo => res.json( todo ) )
    //     .catch( error => res.status( 400 ).json( { error } ) );
  };

  public updateJugador = async (req: Request, res: Response) => {

    const id = +req.params.id;
    const [error, updateJugadorDto] = UpdateJugadorDto.create({ ...req.body,id});

    if(error) return res.status(400).json({error}); 

    
    const updateJugador = await this.jugadorRepository.updateById(updateJugadorDto!);
    return res.json(updateJugador);

    //   const [ error, updateTodoDto ] = UpdateTodoDto.create( { ...req.body, id } );
    //   if ( error ) return res.status( 400 ).json( { error } );

    //   new UpdateTodo( this.todoRepository )
    //     .execute( updateTodoDto! )
    //     .then( todo => res.json( todo ) )
    //     .catch( error => res.status( 400 ).json( { error } ) );

  };


  public deleteJugador = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deleteJugador = await this.jugadorRepository.deleteById(id);
    res.json(deleteJugador);

    //   new DeleteTodo( this.todoRepository )
    //     .execute( id )
    //     .then( todo => res.json( todo ) )
    //     .catch( error => res.status( 400 ).json( { error } ) );

  };



} 