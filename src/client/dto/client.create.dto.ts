import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserCreateDTO } from "src/lib/dto/user.create.dto";

export class ClientCreateDTO extends UserCreateDTO {
    @IsNotEmpty({ message: "Не указана огранизация клиента" })
    @ApiProperty()
    clientOrganizationId: number;
}