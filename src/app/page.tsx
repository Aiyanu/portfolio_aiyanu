"use client";
import Image from "next/image";
import ContactBucketWrapper from "../components/ContactWrapper";
import ContactForm from "@/components/ContactForm";
import Summary from "@/components/Summary";
import Skills from "@/components/Skill/Skills";
import Experience from "@/components/Experience/Experience";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { useGlobalContext } from "@/context/GlobalContext";

export default function Home() {
  const { closeMenu } = useGlobalContext();
  return (
    <MaxWidthWrapper
      onClick={closeMenu}
      className=" flex flex-col justify-center h-full space-y-8 max-sm:max-w-lg max-sm:w-4/5"
    >
      <Summary />
      <Separator />
      <Experience />
      <Separator />
      <Skills />
    </MaxWidthWrapper>
  );
}
