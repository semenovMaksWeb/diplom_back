import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
    constructor() { }

    private errors403() {
        throw new HttpException('Доступ закрыт', HttpStatus.FORBIDDEN);
    }

    async checkToken(authorization: string) {
        if (authorization) {
            // TODO вызов service
            console.log("получить пользователя и проверить если ли он");
        }
        // TODO пользователя нет то 403
        if (true) {
            this.errors403();
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = this.checkToken(request);
        return true;
    }
}