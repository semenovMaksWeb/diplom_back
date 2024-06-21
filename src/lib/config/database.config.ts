import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const DatabaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1",
    database: "diplom",
    synchronize: true,
    autoLoadEntities: true,
}