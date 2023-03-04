import { IUserResponseForMessage } from "./IUserResponseForMessageDto";

export interface IMessageResponse {
    author: IUserResponseForMessage,
    recipient: IUserResponseForMessage,
    adId: number,
    isRead: boolean,
    title: string,
    body: string,
    date: Date
}