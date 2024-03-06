import { Image } from "./Image";
import { User } from "./User";

type UserId = {
  userId: string;
}



export interface Post {
  postId: number;
  User: User;
  content: string;
  Images: Image[];
  createdAt: Date;
  Hearts: UserId[];
  Reposts: UserId[];
  Comments: UserId[];
  _count: {
    Hearts: number;
    Reposts: number;
    Comments: number;
  }
  Original: Post;
  Parent: Post;
}
