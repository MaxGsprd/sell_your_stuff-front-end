export class Address {
    id!: number;
    streetNumber!: number;
    streetName!: string;
    postalCode!: string;
    city!: string;
    province?: string;
    country!: string;
    additionalInfo!: string;
}