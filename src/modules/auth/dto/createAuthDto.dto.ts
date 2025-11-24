import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class CreateAuthDto {
  @Length(11, 11, {
    message: 'O CPF precisa ter onze (11) números.',
  })
  @IsAlphanumeric()
  @IsNotEmpty({
    message: 'O campo CPF é obrigatório. Por favor, forneça um CPF válido.',
  })
  CPF: string;

  @Length(8, 8, {
    message: 'A senha precisa ter seis (8) caracteres',
  })
  @IsAlphanumeric()
  @IsNotEmpty({
    message: 'O campo senha é obrigatório. Por favor, forneça uma senha.',
  })
  password: string;
}
