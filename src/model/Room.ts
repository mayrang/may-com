import { User } from "./User";


export interface Room {
    room: string;
    content: string;
    Receiver: User;
    createdAt: Date;
}