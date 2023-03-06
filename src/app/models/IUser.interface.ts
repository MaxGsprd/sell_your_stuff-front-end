import { Role } from "./role"

export interface IUser {
    id: number
    name: string,
    birthDate: Date,
    email: string,
    phone: string,
    password: string,
    roleId?: number,
    role?: Role
}