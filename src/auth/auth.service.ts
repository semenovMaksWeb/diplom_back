import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ClientService } from 'src/client/client.service';
import { ExecutorService } from 'src/executor/executor.service';
import { AuthAuthorizationDTO } from './dto/auth.authorization.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject(forwardRef(() => ClientService))
        private readonly clientService: ClientService,
        @Inject(forwardRef(() => ExecutorService))
        private readonly ExecutorService: ExecutorService
    ) { }

    public async getUser(token: any) {
        return await this.cacheManager.get(token);
    }

    private async setToken(token: string, data: any) {
        await this.cacheManager.set(token, data);
    }

    public async deleteToken(token: string) {
        await this.cacheManager.del(token);
    }

    private generatorToken(tlf: string, password: string, id: number, isExecutor: boolean): string {
        const string = `${new Date()} ${tlf} ${password} ${id} ${isExecutor}}`;
        const token = jwt.sign(string, process.env.JWT_SECRET_KEY);
        return token;
    }

    public async authorization(authAuthorizationDTO: AuthAuthorizationDTO) {
        let user;

        if (authAuthorizationDTO.isExecutor) {
            user = await this.ExecutorService.findTflAndPassword(
                authAuthorizationDTO.telephone,
                authAuthorizationDTO.password
            );
        }

        if (!authAuthorizationDTO.isExecutor) {
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
            authAuthorizationDTO.isExecutor
        );
        await this.setToken(token, { user, isExecutor: authAuthorizationDTO.isExecutor });
        return token;
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async checkPassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

}