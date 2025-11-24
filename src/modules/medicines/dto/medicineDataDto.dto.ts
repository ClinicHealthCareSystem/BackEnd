import { IsNotEmpty, IsString } from 'class-validator';

export class medicineDataDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  dosagem: string;

  @IsString()
  @IsNotEmpty()
  dataInicio: string;

  @IsString()
  @IsNotEmpty()
  dataTermino: string;

  @IsString()
  @IsNotEmpty()
  vezesAoDia: string;

  @IsString()
  @IsNotEmpty()
  horarioManha: string;

  @IsString()
  @IsNotEmpty()
  horarioTarde: string;

  @IsString()
  @IsNotEmpty()
  nomeMedico: string;
}
