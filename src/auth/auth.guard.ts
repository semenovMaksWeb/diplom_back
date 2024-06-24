import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { TypeUserDecorator } from 'src/lib/decorator/user.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;
    const typeUser = this.reflector.get<TypeUserDecorator>('type', context.getHandler());

    if (!typeUser) {
      return;
    }

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide token');
    }

    const authToken = authorization.replace(/bearer/gim, '').trim();
    const resp: any = await this.authService.getUser(authToken);

    if (typeUser == TypeUserDecorator.developer && !resp?.isDeveloper) {
      throw new ForbiddenException("У вас нет прав на эти действия");
    }

    return true;

  }
}