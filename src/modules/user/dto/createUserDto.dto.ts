import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @Length(3)
    @IsString({
        message:
            'O campo "nome" informado não é válido. Por favor, forneça um nome válido.',
    })
    @IsNotEmpty({
        message:
            'O campo "nome" é obrigatório. Por favor, forneça um nome.',
    })
    name: string;

    @IsEmail({}, {
        message: 'O campo "email" informado não é válido. Por favor, forneça um email válido.',
    })
    @IsNotEmpty({
        message:
            'O campo "email" é obrigatório. Por favor, forneça um email.',
    })
    email: string;

    @Length(8)
    @IsAlphanumeric()
    @IsNotEmpty({
        message:
            'O campo "senha" é obrigatório. Por favor, forneça uma senha.',
    })
    password: string;

    @Length(11)
    @IsAlphanumeric()
    @IsNotEmpty({
        message:
            'O campo "CPF" é obrigatório. Por favor, forneça um CPF válido.',
    })
    CPF: string;
}