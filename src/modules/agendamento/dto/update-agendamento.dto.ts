import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendamentoDto } from './create-agendamento.dto';
import { IsEnum } from 'class-validator';

export class UpdateAgendamentoDto extends PartialType(CreateAgendamentoDto) {}
