"use client";
import dynamic from "next/dynamic";

const ImgGen = dynamic(() => import("../AvatarMaker/AvatarMaker"), {
  ssr: false,
  loading: () => <p>LOADING . . . </p>,
});

export const ImgGenClient = () => {
  return <ImgGen />;
};
