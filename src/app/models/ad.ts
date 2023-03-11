import { Category } from "./category";
import { IPhoto } from "./IPhoto";

export class Ad {
    id!: number;
    title!: string;
    description!: string;
    publicationDate!: Date;
    price!: number;
    author!: number;
    category!: Category;
    condition?: number | undefined;
    location?: number | undefined;
    Image?: Object[] | undefined;
    photos?: IPhoto[];
}