import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class AgendamentoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateAgendamentoDto, usuario_id: string) {

    const dataAgendada = new Date(`${dto.data}T${dto.hora}:00`);

    if (dataAgendada < new Date()) {
      throw new BadRequestException(
        'Não é possível agendar em uma data/hora no passado.',
      );
    }

    const agendamentoExistente = await this.prisma.agendamento.findFirst({
      where: {
        tipo: dto.tipo,
        data: new Date(dto.data),
        hora: dto.hora,
      },
    });

    if (agendamentoExistente) {
      throw new ConflictException(
        `Já existe um agendamento para ${dto.data} às ${dto.hora}.`,
      );
    }

    const unidade = await this.prisma.unidade.findUnique({
      where: { nome: dto.unidade },
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade '${dto.unidade}' não encontrada.`);
    }

    const convenio = await this.prisma.convenio.findUnique({
      where: { nome: dto.convenio },
    });
    if (!convenio) {
      throw new NotFoundException(`Convênio '${dto.convenio}' não encontrado.`);
    }

    return this.prisma.agendamento.create({
      data: {
        tipo: dto.tipo,
        data: new Date(dto.data),
        hora: dto.hora,
        usuario: { connect: { id: usuario_id } },
        unidade: { connect: { nome: dto.unidade } },
        convenio: { connect: { nome: dto.convenio } },


        ...(dto.tipo === 'CONSULTA'
          ? {
            consulta: {
              create: {
                servico: dto.servico,
                atendimento: dto.tipoAtendimento, 
              },
            },
          }
          : {
            exame: {
              create: {
                nome: dto.nome,
              },
            },
          }),
      },
      include: {
        usuario: true,
        unidade: true,
        convenio: true,
        consulta: true,
        exame: true,
      }
    });
  }


  findAll() {
    return `This action returns all agendamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendamento`;
  }

  update(id: number, updateAgendamentoDto: UpdateAgendamentoDto) {
    return `This action updates a #${id} agendamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendamento`;
  }
}
