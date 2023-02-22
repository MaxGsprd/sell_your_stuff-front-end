import { Address } from "../address";

export interface IUserRequestDto {
    id: number;
    name: string;
    birthDate: Date;
    email: string;
    password: string;
    phone?: string;
    roleId: number;
    // address?: Address;

}