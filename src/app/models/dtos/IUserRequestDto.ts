export interface IUserRequestDto {
    id: number;
    name: string;
    birthDate: string;
    email: string;
    password: string;
    confirmPassword?: string,
    phone?: string;
    roleId?: number;
}