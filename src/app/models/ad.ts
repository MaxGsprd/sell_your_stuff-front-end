import { Category } from "./category";

export class Ad {
    id!: number;
    author!: number;
    title!: string;
    description!: string;
    category!: Category;
    price!: number;
    publicationDate!: Date;
    condition?: number | undefined;
    location?: number | undefined;
    Image?: Object[] | undefined;
}