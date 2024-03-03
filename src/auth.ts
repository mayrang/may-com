import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/signin",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });

        if (!authResponse.ok) {
          return null;
        }

        // 백엔드 서버의 로그인 토큰 받아오기
        let setCookie = authResponse.headers.get("Set-Cookie");

        if (setCookie) {
          // 해당 토큰은 문자열 형태로 그대로 사용하기엔 보안에 취약
          const parsed = cookie.parse(setCookie);
          console.log("set cookie", parsed);
          // set(쿠키 이름, 쿠키 값, 옵션)
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }

        const user = await authResponse.json();

        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
