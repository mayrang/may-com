"use client";
import { usePathname } from "next/navigation";
import React from "react";
import SearchForm from "./SearchForm";
import TrendSection from "./TrendSection";

export default function RightSearchZone() {
  const path = usePathname();
  if (path === "/explore") {
    return null;
  }
  return (
    <>
      <SearchForm />
      <TrendSection />
    </>
  );
}
