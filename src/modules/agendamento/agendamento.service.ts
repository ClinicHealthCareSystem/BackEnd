import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';



@Injectable()
export class AgendamentoService {
  constructor(private readonly prisma: PrismaService) { }
  create(dto: CreateAgendamentoDto) {
    this.prisma.agendamento.create({
      data: {
        tipo: dto.tipo,
        data: new Date(dto.data),
        hora: dto.hora,
        status: dto.status,
        usuario: { connect: { id: dto.usuario_id } },
        unidade: { connect: { id: dto.unidade_id } },
        convenio: { connect: { id: dto.convenio_id } },

      },
      include: {
        usuario: true,
        unidade: true,
        convenio: true,
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
