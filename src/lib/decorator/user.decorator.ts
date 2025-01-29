import { SetMetadata } from '@nestjs/common';

export enum TypeUserDecorator {
    executor = "executor",
    client = "client"
}

export const UserDecorator = (name: TypeUserDecorator) => SetMetadata('type', name);