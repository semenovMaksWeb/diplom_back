import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserCreateDTO {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    surname: string;

    @IsNotEmpty()
    @ApiProperty()
    patronymic: string;

    @IsNotEmpty()
    @ApiProperty()
    telephone: string;
}