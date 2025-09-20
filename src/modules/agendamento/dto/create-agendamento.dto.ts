import { IsUUID, IsEnum, IsDateString, IsString, IsOptional, isString, ValidateIf, IsNotEmpty } from 'class-validator';
import { TipoAgendamento, TipoAtendimento} from '@prisma/client';
export class CreateAgendamentoDto {
    @IsEnum(TipoAgendamento)
    tipo: TipoAgendamento;

    @IsDateString()
    data: string;

    @IsString()
    hora: string;

    @IsString()
    unidade: string;

    @IsString()
    convenio: string;

    //CASO CONSULTA
    @ValidateIf((o) => o.tipo === TipoAgendamento.CONSULTA)
    @IsString({ message: 'O campo servico é obrigatório para consultas' })
    @IsNotEmpty({ message: 'O campo servico não pode estar vazio' })
    servico?: string;

    @ValidateIf((o) => o.tipo === TipoAgendamento.CONSULTA)
    @IsEnum(TipoAtendimento, { message: 'O tipo de atendimento deve ser PRESENCIAL ou REMOTO' })
    @IsNotEmpty({ message: 'O campo atendimento não pode estar vazio' })
    tipoAtendimento?: TipoAtendimento

    //CASO EXAME
    @ValidateIf((o) => o.tipo === TipoAgendamento.EXAME)
    @IsString({ message: 'O campo nome é obrigatório para exames' })
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio' })
    nome?: string;
}

