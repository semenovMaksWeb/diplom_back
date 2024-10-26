import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TaskUpdateDTO {
    @IsNotEmpty()
    @ApiProperty()
    id: number;

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