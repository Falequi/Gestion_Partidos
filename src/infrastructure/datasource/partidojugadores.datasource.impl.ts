import { prisma } from "../../data/postgres";
import { CreatePartidoJugadoresDto, UpdatePartidoJugadoresDto } from "../../domain/dto";
import { PartidoJugadoresDatasource } from "../../domain/datasource/partidosjugadores.datasource";
import { PartidoJugadoresEntity } from '../../domain/entities/partidojugadores.entity';
import { count, error } from "console";

export class PartidoJugadoresDatasourceImpl implements PartidoJugadoresDatasource {

    async findByIdPartido(id_partido: number): Promise<{ [key: string]: any }> {

        const jugadores = await prisma.partido_Jugadores.findMany({
            relationLoadStrategy: 'join',
            where: {
                id_partido
            },
            select: {
                equipo: true,
                tarjeta_amarilla: true,
                tarjeta_roja: true,
                goles: true,
                autogoles: true,
                estado_pago: true,
                calificacion: true,
                jugador: {
                    select: {
                        id: true,
                        nombre_corto: true,
                        socio: true,
                    }
                },
                partido: {
                    select: {
                        fecha: true,
                        lugar: true,
                        id_tipo: true,
                        tipo_partido: {
                            select: {
                                tipo: true,
                                descripcion: true,
                            }
                        }
                    }
                }
            }
        });

        const listaJugadores = jugadores.map((jugador, i) => ({
            nombre_corto: jugador.jugador.nombre_corto,
            equipo: jugador.equipo,
            tarjeta_amarilla: jugador.tarjeta_amarilla,
            tarjeta_roja: jugador.tarjeta_roja,
            goles: jugador.goles,
            autogoles: jugador.autogoles,
            calificacion: jugador.calificacion,
            socio: jugador.jugador.socio,
            estado_pago: jugador.estado_pago,
        }));

        const infoPartido = {
            "lugar": jugadores[0].partido.lugar,
            "fecha": jugadores[0].partido.fecha,
            "tipo_partido": jugadores[0].partido.tipo_partido?.tipo,
            "descripcion": jugadores[0].partido.tipo_partido?.descripcion,
            "Numero_Jugadores": jugadores.length,
            "jugadores": listaJugadores
        }

        return infoPartido;
    }

    async findByIdJugadorIdPartido(id_jugador: number, id_partido: number): Promise<PartidoJugadoresEntity> {

        const partidoJugador = await prisma.partido_Jugadores.findFirst({
            where: { id_jugador, id_partido }
        });

        if (!partidoJugador) throw `Registro no existe`;

        return PartidoJugadoresEntity.fromObject(partidoJugador);

    }

    async deleteByIdJugadorIdPartido(id_jugador: number, id_partido: number): Promise<{ numero_registros: number }> {

        const deletedPartidoJugadoresIdJugadorIdPartido = await prisma.partido_Jugadores.deleteMany({
            where: {
                id_jugador,
                id_partido
            }
        });
        const numero_registros = deletedPartidoJugadoresIdJugadorIdPartido.count;
        return { numero_registros };
    }

    async createIdjugadorIdpartido(createPartidoJugadoresDto: CreatePartidoJugadoresDto): Promise<PartidoJugadoresEntity> {

        const { id_jugador, id_partido } = createPartidoJugadoresDto;

        const IdJugadorIdPartido = await this.findByIdJugadorIdPartido(id_jugador, id_partido);

        if (IdJugadorIdPartido) throw `The record already exists`;

        const partidoJugador = await prisma.partido_Jugadores.create({
            data: createPartidoJugadoresDto
        });

        return PartidoJugadoresEntity.fromObject(partidoJugador);
    }

    async goleadorPorPartido(fecha: string): Promise<{ nombre_corto: string, goles: number }[]> {

        const partido = await prisma.partido.findFirst({
            where: { fecha }
        });

        const goleadores = await prisma.partido_Jugadores.findMany({
            relationLoadStrategy: 'join',
            where: {
                id_partido: partido?.id,
                goles: { gt: 0 }
            },
            select: {
                jugador: {
                    select: {
                        nombre_corto: true
                    }
                },
                goles: true,
                autogoles: true,
            },
            orderBy: {
                goles: 'desc'
            }
        });

        const rankingGoleadores = goleadores.map(goleador => ({
            nombre_corto: goleador.jugador.nombre_corto,
            goles: (goleador.goles || 0) - (goleador.autogoles || 0),
        }));


        return rankingGoleadores;
    }

    async partidoGanadosComoDt(): Promise<{ nombre_corto: string, partidos_ganados_dt: number }[]> {

        const partidosGanadosComoDT = await prisma.partido_Jugadores.groupBy({
            by: ['id_jugador'],
            _sum: {
                dt_ganador: true
            },
            orderBy: {
                _sum: {
                    dt_ganador: 'desc'
                },
            },
            where: {
                dt_ganador: { gt: 0 }
            }
        });

        const DatosDT = await prisma.jugador.findMany({
            where: {
                id: {
                    in: partidosGanadosComoDT.map((resultado) => resultado.id_jugador),
                }
            },
            select: {
                id: true,
                nombre_corto: true
            }
        });

        const rankingDt = partidosGanadosComoDT.map(partidoGanadoComoDT => ({
            nombre_corto: DatosDT.find((datoDT: any) => datoDT.id === partidoGanadoComoDT.id_jugador)?.nombre_corto || 'error',
            partidos_ganados_dt: partidoGanadoComoDT._sum.dt_ganador || 0
        }));

        return rankingDt;
    }

    async partidoGanadosPorJugador(): Promise<{ nombre_corto: string, partidos_ganados_jugador: number }[]> {

        const golesPorEquipo = await prisma.partido_Jugadores.groupBy({
            by: ['id_partido', 'equipo'],
            _sum: {
                goles: true,
                autogoles: true
            }
        });

        const resultadosPartidoPorEquipos = golesPorEquipo.map(marcadorEquipo => {
            const autogol = golesPorEquipo.filter(res => (res._sum.autogoles || 0) > 0 && res.id_partido === marcadorEquipo.id_partido);
            const autogolesFiltrados = autogol.filter(autogol => marcadorEquipo.id_partido === autogol.id_partido && marcadorEquipo.equipo !== autogol.equipo);
            const autogoles = autogolesFiltrados.length > 0 ? autogolesFiltrados[0]._sum.autogoles || 0 : 0;

            return {
                id_partido: marcadorEquipo.id_partido,
                equipo: marcadorEquipo.equipo,
                marcador: (marcadorEquipo._sum.goles || 0) + autogoles
            };
        });


        const resultadosFiltrados: { [key: string]: any } = {};

        resultadosPartidoPorEquipos.forEach(resultadoPartidoPorEquipo => {
            const { id_partido, equipo, marcador } = resultadoPartidoPorEquipo;
            if (!(id_partido in resultadosFiltrados) || marcador > resultadosFiltrados[id_partido].marcador) {
                resultadosFiltrados[id_partido] = { id_partido, equipo, marcador };
            } else if (marcador === resultadosFiltrados[id_partido].marcador) {
                delete resultadosFiltrados[id_partido];
            }
        });

        const arrayResultados = Object.values(resultadosFiltrados);
        const arrayJugadores: { [key: string]: any } = [];

        await Promise.all(arrayResultados.map(async (resultados) => {

            const { id_partido, equipo } = resultados;

            const jugadoresConPatidosGanador = await prisma.partido_Jugadores.groupBy({
                by: ['id_jugador', 'id_partido', 'equipo'],
                where: {
                    id_partido,
                    equipo,
                }
            });

            jugadoresConPatidosGanador.forEach(async (jugadores) => {
                await arrayJugadores.push(jugadores);
            });
            await arrayJugadores.push(resultados);
        }));

        await Promise.all(arrayJugadores.map(async (jugadores: any) => {
            const jugador = await prisma.jugador.findFirst({
                where: { id: jugadores.id_jugador, tipo: 'integrante' },
                select: {
                    nombre_corto: true
                }
            });
            jugadores.nombre_corto = jugador?.nombre_corto;
        }));


        // Creamos un mapa para almacenar el resultado de cada partido
        const resultadosPartidos: { [key: number]: boolean } = {};

        // Llenamos el mapa con los resultados de cada partido
        arrayJugadores.forEach((jugador: any) => {
            if (jugador.id_partido && jugador.marcador !== undefined) {
                if (!resultadosPartidos[jugador.id_partido]) {
                    resultadosPartidos[jugador.id_partido] = jugador.marcador > 0;
                }
            }
        });

        // Creamos un mapa para almacenar el recuento de partidos ganados por cada jugador
        const partidosGanados: { [key: number]: number } = {};

        // Contamos los partidos ganados para cada jugador
        arrayJugadores.forEach((jugador: any) => {
            if (!partidosGanados[jugador.id_jugador]) {
                partidosGanados[jugador.id_jugador] = 0;
            }

            // Verificamos si el jugador participó en un partido y si su equipo ganó ese partido
            if (jugador.id_partido && resultadosPartidos[jugador.id_partido]) {
                partidosGanados[jugador.id_jugador]++;
            }
        });

        // Creamos un nuevo array con el nombre corto y los partidos ganados de cada jugador
        const resultado: { nombre_corto: string; partidos_ganados_jugador: number }[] = [];

        Object.keys(partidosGanados).forEach((id_jugador) => {

            const jugador = arrayJugadores.find((item: any) => {
                if (item.nombre_corto !== undefined)
                    return item.id_jugador === parseInt(id_jugador, 10)
            });

            if (jugador) {
                resultado.push({
                    nombre_corto: jugador.nombre_corto,
                    partidos_ganados_jugador: partidosGanados[jugador.id_jugador],
                });
            }
        });

        // Ordenamos el resultado por el número de partidos ganados en orden descendente
        resultado.sort((a, b) => b.partidos_ganados_jugador - a.partidos_ganados_jugador);

        return resultado;
    }

    async vayaMenosVencida(): Promise<{ nombre_corto: string, goles_encajados: number }[]> {

        const resultados = await prisma.partido_Jugadores.groupBy({
            by: ['id_jugador'],
            _sum: {
                goles_arquero: true,
            },
            orderBy: {
                _sum: {
                    goles_arquero: 'asc',
                },
            },
            where: {
                goles_arquero: { gt: 0 },
            }
        });

        // Consulta adicional para obtener los nombres cortos de los jugadores
        const nombresJugadores = await prisma.jugador.findMany({
            where: {
                id: {
                    in: resultados.map((resultado) => resultado.id_jugador),
                },
                tipo: 'integrante'
            },
            select: {
                id: true,
                nombre_corto: true,
            },
        });

        // Combinar los resultados de las dos consultas
        const resultadoFinal = resultados.map((resultado) => ({
            nombre_corto: nombresJugadores.find((jugador) => jugador.id === resultado.id_jugador)?.nombre_corto || 'Desconocido',
            goles_encajados: resultado._sum.goles_arquero || 0,
        }));

        //Filtrar solo integrantes
        const resultadoSinInvitados = resultadoFinal.filter(res => res.nombre_corto !== 'Desconocido')

        return resultadoSinInvitados;
    }

    async tarjetasAmarillas(): Promise<{ nombre_corto: string, tarjetas_amarillas: number }[]> {
        const tAmarillasPorId = await prisma.partido_Jugadores.groupBy({
            by: ['id_jugador'],
            where: {
                tarjeta_amarilla: { gt: 0 }
            },
            _sum: {
                tarjeta_amarilla: true
            },
            orderBy: {
                _sum: {
                    tarjeta_amarilla: 'desc'
                }
            }
        });

        const datosJugadores = await prisma.jugador.findMany({
            where: {
                id: {
                    in: tAmarillasPorId.map(tAmarillaPorId => tAmarillaPorId.id_jugador)
                }
            },
            select:
            {
                id: true,
                nombre_corto: true,
            }
        })

        const ranTAmarillar = tAmarillasPorId.map(tAmarillaPorId => ({
            nombre_corto: datosJugadores.find(datoJugador => tAmarillaPorId.id_jugador === datoJugador.id)?.nombre_corto || 'desconocido',
            tarjetas_amarillas: tAmarillaPorId._sum.tarjeta_amarilla || 0,
        }));

        return ranTAmarillar;
    }

    async tarjetasRojas(): Promise<{ nombre_corto: string, tarjetas_rojas: number }[]> {
        const tRojaPorId = await prisma.partido_Jugadores.groupBy({
            by: ['id_jugador'],
            where: {
                tarjeta_roja: { gt: 0 }
            },
            _sum: {
                tarjeta_roja: true
            },
            orderBy: {
                _sum: {
                    tarjeta_roja: 'desc'
                }
            }
        });

        const datosJugadores = await prisma.jugador.findMany({
            where: {
                id: {
                    in: tRojaPorId.map(tRojaPorId => tRojaPorId.id_jugador)
                }
            },
            select:
            {
                id: true,
                nombre_corto: true,
            }
        })

        const ranTRojas = tRojaPorId.map(tRojaPorId => ({
            nombre_corto: datosJugadores.find(datoJugador => tRojaPorId.id_jugador === datoJugador.id)?.nombre_corto || 'desconocido',
            tarjetas_rojas: tRojaPorId._sum.tarjeta_roja || 0,
        }));

        return ranTRojas;
    }

    async goleador(): Promise<{ nombre_corto: string, goles: number }[]> {

        //Suma los goles y autogoles y el id del jugador
        const goleadoresPorID = await prisma.partido_Jugadores.groupBy({
            by: ['id_jugador'],
            _sum: {
                goles: true,
                autogoles: true
            },
            orderBy: {
                _sum: {
                    goles: 'desc'
                }
            },
            where: {
                goles: { gt: 0 }
            }
        });

        // Tarea el ID_del Jugador y el Nombre Corto
        const datosGoleadores = await prisma.jugador.findMany({
            where: {
                id: {
                    in: goleadoresPorID.map(goleadorePorID => goleadorePorID.id_jugador)
                },
                tipo: 'integrante'
            },
            select: {
                id: true,
                nombre_corto: true
            }
        })

        const rankingGoleadores = goleadoresPorID.map(goleadorPorID => ({
            nombre_corto: datosGoleadores.find(datosGoleador => datosGoleador.id === goleadorPorID.id_jugador)?.nombre_corto || 'Desconocido',
            goles: (goleadorPorID._sum.goles || 0) - (goleadorPorID._sum.autogoles || 0),
        }));

        const result = rankingGoleadores.filter(res => res.nombre_corto != 'Desconocido')

        return result;
    }

    async calificacionPorPartidoJugador(fecha: string): Promise<{ nombre_corto: string, calificacion: number }[]> {

        const idPartido = await prisma.partido.findFirst({
            where: { fecha }
        });

        const jugadores = await prisma.partido_Jugadores.findMany({
            relationLoadStrategy: 'join',
            where: {
                id_partido: idPartido!.id
            },
            select: {
                jugador: {
                    select: {
                        nombre_corto: true
                    }
                },
                calificacion: true
            },
            orderBy: {
                calificacion: 'desc'
            },
            // take: 5
        })

        const ranking = jugadores.map(jugador => ({
            nombre_corto: jugador.jugador.nombre_corto,
            calificacion: jugador.calificacion || 0,
        }));

        return ranking;
    }

    async asistenciaPartidos(): Promise<{ nombre_corto: string, numero_asistencias: number }[]> {

        const jugadoresConPartidos = await prisma.partido_Jugadores.groupBy({
            by: ['id_jugador'],
            _count: {
                id_partido: true
            },
            orderBy: {
                _count: {
                    id_partido: 'desc'
                }
            }
        });

        const nombreJugadores = await prisma.jugador.findMany({
            where: {
                id: {
                    in: jugadoresConPartidos.map((jugadorConPartidos) => jugadorConPartidos.id_jugador),
                },
                tipo: 'integrante'
            },
            select: {
                id: true,
                nombre_corto: true,
            },
        });

        const resultadoFinal = jugadoresConPartidos.map((resultado) => ({
            nombre_corto: nombreJugadores.find((jugador) => jugador.id === resultado.id_jugador)?.nombre_corto || 'Desconocido',
            numero_asistencias: resultado._count.id_partido || 0,
        }));

        //filtra los usuarios tipo que no son integrantes
        const result = resultadoFinal.filter((res) => res.nombre_corto != 'Desconocido')

        return result;
    }

    async getAll(): Promise<PartidoJugadoresEntity[]> {

        const partidojugadores = await prisma.partido_Jugadores.findMany();

        return partidojugadores.map(partidojugadores => PartidoJugadoresEntity.fromObject(partidojugadores));

    }

    async findById(id: number): Promise<PartidoJugadoresEntity> {

        const partidoJugador = await prisma.partido_Jugadores.findFirst({
            where: { id }
        });

        if (!partidoJugador) throw `Partido Jugador with id ${id} nor found`;

        return PartidoJugadoresEntity.fromObject(partidoJugador);
    }

    async create(createPartidoJugadoresDto: CreatePartidoJugadoresDto, nombre_corto: string, fecha: string): Promise<PartidoJugadoresEntity> {

        const jugador = await prisma.jugador.findFirst({
            where: { nombre_corto }
        });

        const partido = await prisma.partido.findFirst({
            where: { fecha }
        });

        if (!jugador) throw `El nombre ${nombre_corto} no se encontro`;
        if (!partido) throw `la fecha ${fecha} no se encontro`;

        createPartidoJugadoresDto.id_jugador = jugador!.id;
        createPartidoJugadoresDto.id_partido = partido!.id;

        const partidoJugador = await prisma.partido_Jugadores.create({
            data: createPartidoJugadoresDto
        });

        return PartidoJugadoresEntity.fromObject(partidoJugador);
    }

    async createAll(partidoJugadores: [{ [key: string]: any; }]): Promise<{ mesage: any }> {

        //:TODO falta validar si el registro ya existe que no se vuelva a ingresar

        const promesasPartido = partidoJugadores.map(async partidoJugador => {

            const jugador = await prisma.jugador.findFirst({ where: { nombre_corto: partidoJugador.nombre_corto } });
            if (!jugador) throw (`No se encontró un jugador ${partidoJugador.nombre_corto}`);

            const partido = await prisma.partido.findFirst({ where: { fecha: partidoJugador.fecha } });
            if (!partido) throw (`No se encontró un partido de la fecha  ${partidoJugador.fecha}`);

            partidoJugador.id_jugador = jugador!.id;
            partidoJugador.id_partido = partido!.id;

            const [error, createPartidoJugadoresDto] = CreatePartidoJugadoresDto.create(partidoJugador);
            if (error) throw error;

            return createPartidoJugadoresDto;
        });

        const partidos = await Promise.all(promesasPartido);

        const cleanedDataPartidos = partidos.map(obj => JSON.parse(JSON.stringify(obj)));

        const count = await prisma.partido_Jugadores.createMany({
            data: cleanedDataPartidos
        });

        return { mesage: count }
    }

    async updateById(updatePartidoJugadoresDto: UpdatePartidoJugadoresDto): Promise<PartidoJugadoresEntity> {

        await this.findById(updatePartidoJugadoresDto.id);

        const updatePartidoJugadores = await prisma.partido_Jugadores.update({
            where: { id: updatePartidoJugadoresDto.id },
            data: updatePartidoJugadoresDto!.values
        });


        return PartidoJugadoresEntity!.fromObject(updatePartidoJugadores);
    }

    async updateAllJugadoresPartido(partidoJugadores: [{ [key: string]: any; }]): Promise<PartidoJugadoresEntity[]> {

        const allPartidoJugadores = partidoJugadores.map(async partidoJugador => {

            const jugador = await prisma.jugador.findFirst({ where: { nombre_corto: partidoJugador.nombre_corto } });
            partidoJugador.id_jugador = jugador!.id;

            const partido = await prisma.partido.findFirst({ where: { fecha: partidoJugador.fecha } });
            partidoJugador.id_partido = partido!.id;

            const idpartidoJugador = await prisma.partido_Jugadores.findFirst({ where: { id_partido: partido!.id, id_jugador: jugador!.id } });
            partidoJugador.id = idpartidoJugador!.id;

            const [error, updatePartidoJugadoresDto] = UpdatePartidoJugadoresDto.create(partidoJugador);

            await this.updateById(updatePartidoJugadoresDto!);

            return JSON.parse(JSON.stringify(updatePartidoJugadoresDto));
        })

        const allPartidosJugadoresEntity = await Promise.all(allPartidoJugadores);

        return allPartidosJugadoresEntity;
    }

    async deleteById(id: number): Promise<PartidoJugadoresEntity> {

        await this.findById(id);

        const deletedPartidoJugadores = await prisma.partido_Jugadores.delete({
            where: { id }
        });

        return PartidoJugadoresEntity.fromObject(deletedPartidoJugadores);

    }

    async partidoMarcadores(): Promise<{ [key: string]: any; }[]> {
        try {
            // Consulta todos los partidos y sus jugadores relacionados
            const partidos = await prisma.partido.findMany({
                include: {
                    jugadores: {
                        include: {
                            jugador: true, // Incluye la información del jugador relacionado
                        },
                    },
                },
            });

            

            // Mapea cada partido a su resultado correspondiente
            const resultados = partidos.map((partido) => {
                // Inicializamos el marcador para el partido actual
                const marcador: {
                    equipo1: number;
                    equipo2: number;
                    golesEquipo1: string[];
                    golesEquipo2: string[];
                    autogolesEquipo1: string[];
                    autogolesEquipo2: string[];
                } = {
                    equipo1: 0,
                    equipo2: 0,
                    golesEquipo1: [],
                    golesEquipo2: [],
                    autogolesEquipo1: [],
                    autogolesEquipo2: [],
                };

                let equipos: string[] = [];
                // Procesamos los jugadores del partido actual
                partido.jugadores.forEach((participacion) => {
                    equipos = Array.from(new Set(partido.jugadores.map((jugador) => jugador.equipo)));

                    if (equipos.length !== 2) {
                        throw  `Partido inválido con ${equipos.length} equipos en la fecha: ${partido.fecha}`;
                    }   

                    const { equipo, goles = 0, autogoles = 0, jugador } = participacion;

                    if (equipo === equipos[0]) {
                        marcador.equipo1 += goles || 0; 
                        marcador.equipo2 += autogoles || 0; 
                        if (goles || 0 > 0) marcador.golesEquipo1.push(jugador.nombre_corto);
                        if (autogoles || 0 > 0) marcador.autogolesEquipo1.push(jugador.nombre_corto);
                    } else if (equipo === equipos[1]) {
                        marcador.equipo2 += goles || 0;
                        marcador.equipo1 += autogoles || 0;
                        if (goles || 0 > 0) marcador.golesEquipo2.push(jugador.nombre_corto);
                        if (autogoles || 0 > 0) marcador.autogolesEquipo2.push(jugador.nombre_corto);
                    }
                });

                // Retorna el resultado del partido actual
                return {
                    fecha: partido.fecha,
                    lugar: partido.lugar,
                    marcadorEquipo1: marcador.equipo1,
                    marcadorEquipo2: marcador.equipo2,
                    equipoGanador:
                        marcador.equipo1 > marcador.equipo2
                            ? equipos[0]
                            : marcador.equipo1 < marcador.equipo2
                                ? equipos[1]
                                : "Empate",
                    golesEquipo1: marcador.golesEquipo1,
                    golesEquipo2: marcador.golesEquipo2,
                    autogolesEquipo1: marcador.autogolesEquipo1,
                    autogolesEquipo2: marcador.autogolesEquipo2,
                };
            });

            // Retorna todos los resultados
            return resultados;
        } catch (error) {
            console.error("Error al consultar los resultados de los partidos:", error);
            return [];
        } finally {
            await prisma.$disconnect();
        }
    }
}