import PhotoModal from "@/app/(afterLogin)/@modal/(.)[username]/status/[postId]/photo/[imageId]/page";
import AfterHomePage from "@/app/(afterLogin)/home/page";
import React from "react";

type Props = {
  params: {
    postId: string;
    imageId: string;
  };
};

export default function page({ params }: Props) {
  console.log("params2", params);
  return (
    <>
      <AfterHomePage />
      <PhotoModal params={params} />
    </>
  );
}
