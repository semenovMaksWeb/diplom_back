import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DeveloperEntity } from './developer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperCreateDTO } from './dto/developer.create.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class DeveloperService {
    constructor(
        @InjectRepository(DeveloperEntity)
        private developerRepository: Repository<DeveloperEntity>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {
        // const developerCreateDTO: DeveloperCreateDTO = { name: "admin", password: "1", patronymic: "admin", surname: "admin", telephone: "1" }
        // this.create(developerCreateDTO)
    }

    public async create(developerCreateDTO: DeveloperCreateDTO) {
        developerCreateDTO.password = await this.authService.hashPassword(developerCreateDTO.password);
        return await this.developerRepository.save(developerCreateDTO);
    }
    public async get() {
        return await this.developerRepository.find({ select: ["id", "name", "surname", "patronymic", "telephone"] });
    }
    public async findTflAndPassword(telephone: string, password: string) {
        const user = await this.developerRepository.findOne({
            where: { telephone: telephone }
        });
        if (user && await this.authService.checkPassword(password, user.password)) {
            return user;
        }
        return null;
    }
}
