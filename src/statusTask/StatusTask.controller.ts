import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { StatusTaskService } from "./statusTask.service";

@ApiTags("StatusTask")
@Controller()
export class StatusTaskController {
    constructor(
        private readonly statusTaskService: StatusTaskService
    ) { }

    @ApiQuery({ name: 'id', required: false })
    @Get()
    public async test(
         @Query("id") id: string
    ) {
        if (id) {
            return await this.statusTaskService.getId(id);
        }
        return await this.statusTaskService.getAll();
    }

}