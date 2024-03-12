import { User } from "./User";


export interface Message {
    messageId: number;
    senderId: string;
    Sender?: User;
    Receiver?: User;
    room: string;
    content: string;
    receiverId: string;
    createdAt: Date;
}