import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TaskCreateDTO {
    @IsNotEmpty()
    @ApiProperty()
    theme: string;

    @IsNotEmpty()
    @ApiProperty()
    message: string;

    @IsNotEmpty()
    @ApiProperty()
    client_id: number;

    @IsNotEmpty()
    @ApiProperty()
    developer_id: number;
}