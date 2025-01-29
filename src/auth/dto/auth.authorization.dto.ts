import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthAuthorizationDTO {
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    isExecutor: boolean;

    @IsNotEmpty()
    @ApiProperty()
    telephone: string;
}