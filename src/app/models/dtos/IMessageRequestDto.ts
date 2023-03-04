export interface IMessageRequest {
    authorId: number,
    recipientId?: number,
    adId?: number,
    isRead: boolean,
    title: string,
    body: string,
    date: Date
}