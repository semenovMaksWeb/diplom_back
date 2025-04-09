import { UserCreateDTO } from "src/lib/dto/user.create.dto";

export class ClientCreateDTO extends UserCreateDTO {
    clientOrganizationId: number;
}