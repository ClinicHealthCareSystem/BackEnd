import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAgendamentoDto} from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';



@Injectable()
export class AgendamentoService {
  constructor(private readonly prisma: PrismaService) { }
  create() {
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
