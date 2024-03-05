"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const signupAction = async (prevState: any, formData: FormData) => {
  "use server";
  console.log("prev", prevState);
  let shouldRedirect = false;
  if (!formData.get("id") || !(formData.get("id") as string).trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string).trim()) {
    return { message: "no_name" };
  }
  if (!formData.get("password") || !(formData.get("password") as string).trim()) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  formData.set("nickname", formData.get("name") as string);
  formData.delete("name");
  console.log(formData, `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: "post",
      body: formData,
      
      credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
    });
    if (response.status === 403) {
      return { message: "user_exist" };
    }

    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
    shouldRedirect = true;
  } catch (err) {
    console.log(err);
    shouldRedirect = false;
    return { message: "response_error" };
  }

  if (shouldRedirect) {
    redirect("/home");
  }
};
