import { IsUUID, IsEnum, IsOptional, IsDateString, IsString } from 'class-validator';
import { TipoAgendamento, StatusAgendamento } from '@prisma/client';
export class CreateAgendamentoDto {
    @IsEnum(TipoAgendamento)
    tipo: TipoAgendamento;

    @IsDateString()
    data: string;

    @IsDateString()
    hora: string;

    @IsEnum(StatusAgendamento)
    status: StatusAgendamento;

    @IsUUID()
    usuario_id: string;

    @IsUUID()
    unidade_id: string;

    @IsUUID()
    convenio_id: string;



}

