import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendamentoDto } from './create-agendamento.dto';
import { IsEnum, IsOptional, IsString, isString } from 'class-validator';
import { StatusAgendamento } from '@prisma/client';
export class UpdateAgendamentoDto extends PartialType(CreateAgendamentoDto) {
    @IsOptional()
    @IsString()
    data?: string;

    @IsOptional()
    @IsString()
    hora?: string;

    @IsOptional()
    @IsEnum(StatusAgendamento)
    status?: StatusAgendamento;

}
