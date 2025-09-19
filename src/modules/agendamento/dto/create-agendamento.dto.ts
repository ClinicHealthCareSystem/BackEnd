import { IsUUID, IsEnum, IsDateString, IsString } from 'class-validator';
import { TipoAgendamento } from '@prisma/client';
export class CreateAgendamentoDto {
    @IsEnum(TipoAgendamento)
    tipo: TipoAgendamento;

    @IsDateString()
    data: string;

    @IsDateString()
    hora: string;

    @IsString()
    unidade: string;

    @IsString()
    convenio: string;

}

