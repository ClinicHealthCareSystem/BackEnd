import { IsString, IsNotEmpty } from 'class-validator';

export class inputDto {
  @IsString({
    message:
      'O campo nome informado não é válido. Por favor, forneça um nome válido.',
  })
  @IsNotEmpty({
    message: 'O campo nome é obrigatório. Por favor, forneça um nome.',
  })
  input: string;
}
