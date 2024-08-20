import Image from "next/image";
import ContactBucketWrapper from "../components/ContactWrapper";
import ContactForm from "@/components/ContactForm";
import Summary from "@/components/Summary";
import Skills from "@/components/Skill/Skills";
import Experience from "@/components/Experience";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <MaxWidthWrapper className=" flex flex-col justify-center h-full space-y-8">
      <Summary />
      <Separator />
      <Skills />
      <Separator />
      <Experience />
    </MaxWidthWrapper>
  );
}
