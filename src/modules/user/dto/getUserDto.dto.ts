import { IsAlphanumeric, IsNotEmpty, Length } from "class-validator";

export class getUserDto {
    @Length(11)
    @IsAlphanumeric()
    @IsNotEmpty({
        message:
            'O campo "CPF" é obrigatório. Por favor, forneça um CPF válido.',
    })
    CPF: string;
}