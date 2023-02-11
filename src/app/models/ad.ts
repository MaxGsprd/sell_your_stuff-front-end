import { IAd } from "../components/ads/IAd.interface"

export class Ad implements IAd {
    Id!: number;
    Author!: number;
    Title!: string;
    Location?: number;
    Description!: string;
    Condition!: number;
    Category!: string;
    Price!: number;
    Date!: Date;
    Image?: string
}