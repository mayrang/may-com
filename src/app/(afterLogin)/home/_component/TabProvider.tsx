"use client";
import React, { createContext, useState } from "react";

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});

export default function TabProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState("rec");

  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
}
