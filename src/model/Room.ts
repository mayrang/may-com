import { User } from "./User";


export interface Room {
    Sender: User;

    room: string;
    content: string;
    Receiver: User;
    createdAt: Date;
}