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
    developer_id: string;
}