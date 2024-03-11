import { cookies } from "next/headers";



export async function getRoomsServer(userId:string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/rooms`, {
        next: {
          tags: ["rooms"],
        },
        cache: "no-cache",
        credentials: "include",
        headers: {
            Cookie: cookies().toString()
        }
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
}