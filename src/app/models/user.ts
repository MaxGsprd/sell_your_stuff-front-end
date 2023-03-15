import { Role } from "./role"

export class User implements User { 
    id!: number
    name!: string
    birthDate!: Date
    email!: string
    phone!: string
    password!: string
    roleId?: number
    role?: Role
}