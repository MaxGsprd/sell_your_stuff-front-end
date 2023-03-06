import { Address } from "../address";
import { Category } from "../category";
import { Condition } from "../condition";
import { IUserResponseDto } from "./IUserResponseDto";

export interface IAdResponseDto {
    id: number,
    title: string,
    description: string,
    publicationDate: Date,
    price: number,
    user: IUserResponseDto,
    category: Category,
    condition: Condition,
    location?: Address,
    adImage?: string
}