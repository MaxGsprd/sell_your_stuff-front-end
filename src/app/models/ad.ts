import { IAd } from "./IAd.interface"

export class Ad implements IAd {
    id!: number;
    author!: number;
    title!: string;
    description!: string;
    category!: number;
    price!: number;
    publicationDate!: Date;
    condition?: number | undefined;
    location?: number | undefined;
    Image?: Object[] | undefined;
}