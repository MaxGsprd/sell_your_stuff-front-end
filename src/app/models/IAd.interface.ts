import { Category } from "./category";

export interface IAd {
    id: number,
    author: number,
    title: string,
    description: string,
    category: Category,
    price: number,
    publicationDate: Date,
    condition?: number,
    location?: number,
    Image?: Array<Object>
}