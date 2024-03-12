

type Props = {
    pageParam:number;
    queryKey: [_1:string, ids: {senderId: string; receiverId: string}, _3: string]
}

export async function getMessages({pageParam, queryKey}: Props) {
    const [_1, {senderId, receiverId}, _3] = queryKey;  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${senderId}/rooms/${receiverId}?cursor=${pageParam}`, {
      next: {
        tags: ["rooms", senderId, receiverId, "messages"],
      },
      cache: "no-cache",
      credentials: "include",
 
    });
    console.log("res", res)
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    
    return res.json();
  }
  