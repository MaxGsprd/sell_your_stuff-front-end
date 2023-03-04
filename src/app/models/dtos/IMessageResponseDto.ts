import { IUserResponseForMessage } from "./IUserResponseForMessageDto";

export interface IMessageResponse {
    id:number,
    author: IUserResponseForMessage,
    recipient: IUserResponseForMessage,
    adId: number,
    isRead: boolean,
    title: string,
    body: string,
    date: Date
}