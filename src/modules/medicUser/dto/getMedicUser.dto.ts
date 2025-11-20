import { IsEmail, IsNotEmpty, Matches, Length } from 'class-validator';

export class getUserDto {

  @IsEmail({}, { message: 'Forneça um e-mail válido.' })
  @Matches(/^2025\d{5}@saude\.com$/, {
    message:
      'O e-mail institucional deve seguir o formato: 2025 + 5 dígitos aleatórios + @saude.com. Exemplo: 202512345@saude.com',
  })
  @IsNotEmpty({
    message: 'O campo email é obrigatório.',
  })
  email: string;

  @Length(6, 12, {
    message: 'A senha precisa ter entre seis (6) e doze (12) caracteres.',
  })
  @IsNotEmpty({
    message: 'O campo senha é obrigatório.',
  })
  password: string;
}
