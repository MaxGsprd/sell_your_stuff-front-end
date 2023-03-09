import { Category } from "./category";
import { IPhoto } from "./IPhoto";

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
    photos?: IPhoto[];
}