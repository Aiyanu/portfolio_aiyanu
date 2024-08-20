import { Download } from "lucide-react";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function Summary() {
  return (
    <div className="h-full flex flex-1 items-center justify-center gap-4">
      <div className="flex-1">
        <h1 className="text-6xl">🙂 Hi, I{"'"}m Iyanu</h1>
        <p className="text-lg">
          I{"'"}m a full stack web developer from Nigeria. Currently a student
          od Afe Babalola University. In my spare time I enjoy studying,
          sleeping, gaming and building my own projects. My preferred tools are
          Tailwind, Typescript, Nodejs, Express and Next.js.
        </p>
      </div>
      <div className="flex justify-center flex-col items-center">
        <a
          href="/assets/CV.pdf"
          download
          className="animate-pulse duration-[2000]"
        >
          <Download size={150} />
        </a>
        <p>Download my CV</p>
      </div>
    </div>
  );
}
