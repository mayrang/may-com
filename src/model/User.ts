export interface User {
  id: string;
  nickname: string;
  image: string;
  _count: {
    Followers: number;
    Followings: number;
  }
  Followers: UserId[];
}

type UserId = {
  id: string;
}



/* 
<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >

  QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
>
**/
