import { Category } from "./category";
import { Condition } from "./condition";
import { IUserResponseDto } from "./dtos/IUserResponseDto";
import { IPhoto } from "./IPhoto";

export interface IAd {
    id: number;
    title: string;
    description: string;
    publicationDate: Date;
    price: number;
    user: IUserResponseDto;
    category: Category;
    condition: Condition;
    photos: IPhoto[];
}