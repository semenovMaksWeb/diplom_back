import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class taskUpdateStatusDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @ApiProperty()
    id_status: number
}