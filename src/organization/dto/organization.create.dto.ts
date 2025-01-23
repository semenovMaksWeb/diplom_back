import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OrganizationCreateDTO {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    active: boolean;
}