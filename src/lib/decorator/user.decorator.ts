import { SetMetadata } from '@nestjs/common';

export enum TypeUserDecorator {
    developer = "developer",
    client = "client"
}

export const UserDecorator = (name: TypeUserDecorator) => SetMetadata('type', name);