import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserUpdateActiveDTO {
    @IsNotEmpty({ message: "Не указан id пользователя" })
    @ApiProperty()
    id: string;

    @IsNotEmpty({ message: "Не указана активность пользователя" })
    @ApiProperty()
    active: boolean;
}