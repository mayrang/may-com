"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import Main from "../_component/Main";

export default function LoginPage() {
  const router = useRouter();
  router.replace("/i/flow/login");
  return <Main />;
}
