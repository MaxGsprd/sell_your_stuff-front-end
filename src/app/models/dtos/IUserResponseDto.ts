import { Role } from "../role";

export interface IUserResponseDto {
    id?: number;
    name?: string;
    email: string;
    phone?: string;
    role: Role;
    birthDate: Date
}