export interface IAdRequestDto {
    id: number,
    title: string,
    description: string,
    publicationDate: Date,
    price: number,
    userId: number,
    categoryId: number,
    conditionId?: number,
    addressId?: number,
    Image?: Array<Object>
}