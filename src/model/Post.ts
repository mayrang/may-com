import { Image } from "./Image";
import { User } from "./User";

export interface Post {
  postId: number;
  User: User;
  content: string;
  Images: Image[];
  createdAt: Date;
}
