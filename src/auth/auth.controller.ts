import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAuthorizationDTO } from './dto/auth.authorization.dto';
import { AuthService } from './auth.service';

@ApiTags("auth")
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("authorization")
    public async authorization(
        @Body() authAuthorizationDTO: AuthAuthorizationDTO
    ) {
        return await this.authService.authorization(authAuthorizationDTO);
    }

    @ApiQuery({ name: "token" })
    @Get("test")
    public async test(
        @Query("token") token: string
    ) {
        return await this.authService.getUser(token);
    }
}
