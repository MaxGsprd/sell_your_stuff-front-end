export interface IMessage {
    id: number,
    authorId?: number,
    recipientId?: number,
    adId?: number,
    isRead: boolean,
    title: string,
    body: string,
    date: Date
}