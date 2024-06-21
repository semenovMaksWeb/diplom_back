import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ContractCreateDTO {
    @IsNotEmpty()
    @ApiProperty()
    clientId: number;
}