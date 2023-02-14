export interface IAd {
    id: number,
    author: number,
    title: string,
    description: string,
    category: number,
    price: number,
    publicationDate: Date,
    condition?: number,
    location?: number,
    Image?: Array<Object>
}