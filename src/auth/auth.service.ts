import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ClientService } from 'src/client/client.service';
import { DeveloperService } from 'src/developer/developer.service';
import { AuthAuthorizationDTO } from './dto/auth.authorization.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly clientService: ClientService,
        private readonly developerService: DeveloperService
    ) { }

    public async getUser(token: any) {
        return await this.cacheManager.get(token);
    }

    private async setToken(token: string, data: any) {
        await this.cacheManager.set(token, data);
    }
    private generatorToken(tlf: string, password: string, id: number, isDeveloper: boolean): string {
        const string = `${new Date()} ${tlf} ${password} ${id} ${isDeveloper}}`;
        const token = jwt.sign(string, process.env.JWT_SECRET_KEY);
        return token;
    }

    public async authorization(authAuthorizationDTO: AuthAuthorizationDTO) {
        let user;

        if (authAuthorizationDTO.isDeveloper) {
            user = await this.developerService.findTflAndPassword(
                authAuthorizationDTO.telephone,
                authAuthorizationDTO.password
            );
        }

        if (!authAuthorizationDTO.isDeveloper) {
            user = await this.clientService.findTflAndPassword(
                authAuthorizationDTO.telephone,
                authAuthorizationDTO.password
            );
        }

        if (!user) {
            throw new ForbiddenException("Не верно указан номер или пароль");
        }

        const token = this.generatorToken(
            authAuthorizationDTO.telephone,
            authAuthorizationDTO.password,
            user.id,
            authAuthorizationDTO.isDeveloper
        );
        await this.setToken(token, user);
        return token;
    }
}