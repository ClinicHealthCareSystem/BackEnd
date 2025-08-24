import {
  IsAlphanumeric,
  IsPhoneNumber,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 50, {
    message:
      'O campo nome precisa ter mais de três (3) caracteres e menos que trinta e cinto (50) caracteres',
  })
  @IsString({
    message:
      'O campo nome informado não é válido. Por favor, forneça um nome válido.',
  })
  @IsNotEmpty({
    message: 'O campo nome é obrigatório. Por favor, forneça um nome.',
  })
  name: string;

  @IsPhoneNumber('BR', {
    message:
      'O campo celular informado não é válido. Por favor, forneça um celular válido.',
  })
  @IsNotEmpty({
    message: 'O campo email é obrigatório. Por favor, forneça um email.',
  })
  phone: string;

  @Length(8, 12, {
    message: 'A senha precisa ter seis (8) caracteres',
  })
  @IsAlphanumeric()
  @IsNotEmpty({
    message: 'O campo senha é obrigatório. Por favor, forneça uma senha.',
  })
  password: string;

  @Length(11, 11, {
    message: 'O CPF precisa ter onze (11) números.',
  })
  @IsAlphanumeric()
  @IsNotEmpty({
    message: 'O campo CPF é obrigatório. Por favor, forneça um CPF válido.',
  })
  CPF: string;
}
