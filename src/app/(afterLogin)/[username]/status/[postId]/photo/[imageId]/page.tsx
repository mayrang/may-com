import PhotoModal from "@/app/(afterLogin)/@modal/(.)[username]/status/[postId]/photo/[imageId]/page";
import AfterHomePage from "@/app/(afterLogin)/home/page";
import React from "react";

export default function page() {
  return (
    <>
      <AfterHomePage />
      <PhotoModal />
    </>
  );
}
