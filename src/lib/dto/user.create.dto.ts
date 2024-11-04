import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserCreateDTO {
    @IsNotEmpty({ message: "Не указано имя клиента" })
    @ApiProperty()
    name: string;

    @IsNotEmpty({ message: "Не указано фамилия клиента" })
    @ApiProperty()
    surname: string;

    @IsNotEmpty({ message: "Не указано отчество клиента" })
    @ApiProperty()
    patronymic: string;

    @IsNotEmpty({ message: "Не указано телефон клиента" })
    @ApiProperty()
    telephone: string;

    @IsNotEmpty({ message: "Не указано пароль клиента" })
    @ApiProperty()
    password: string;
}