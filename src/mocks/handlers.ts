import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", () => {
    return HttpResponse.json(
      {
        userId: 1,
        nickname: "제로초",
        id: "zerocho",
        image: "/5Udwvqim.jpg",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  http.post("/api/logout", () => {
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/users", () => {
    console.log("회원가입");
    // 중복 유저가 존재할 때를 테스트 하고 싶다면 아래의 주석을 해제하여 사용
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;",
      },
    });
  }),
];
