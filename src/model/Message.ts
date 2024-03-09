import { User } from "./User";


export interface Message {
    room: string;
    content: string;
    Receiver: User;
    createdAt: Date;
}