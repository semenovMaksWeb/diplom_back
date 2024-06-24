import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthAuthorizationDTO {
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    isDeveloper: boolean;

    @IsNotEmpty()
    @ApiProperty()
    telephone: string;
}