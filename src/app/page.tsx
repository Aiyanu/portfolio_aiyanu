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
import EducationSection from "@/components/Education";

export default function Home() {
  return (
    <>
      <Summary />
      <EducationSection />
      <Experience />
      <Skills />
    </>
  );
}
