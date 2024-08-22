"use client";
import ContactWrapper from "@/components/ContactWrapper";
import ContactForm from "@/components/ContactForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Underline from "@/components/Underline";
import { useGlobalContext } from "@/context/GlobalContext";

const Contact = () => {
  const { closeMenu } = useGlobalContext();

  return (
    <div onClick={closeMenu} className="md:mb-16">
      <div className="md:pl-16 max-md:grid max-md:place-items-center">
        <h1 className="text-4xl uppercase max-md:text-center ">Contact Me</h1>
        <Underline className="max-md:w-1/3" />
      </div>
      <div className="grid place-items-center ">
        <ContactWrapper className="grid place-items-center max-sm:p-8">
          <ContactForm />
        </ContactWrapper>
      </div>
    </div>
  );
};

export default Contact;
