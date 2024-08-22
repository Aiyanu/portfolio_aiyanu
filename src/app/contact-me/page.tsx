"use client";
import ContactWrapper from "@/components/ContactWrapper";
import ContactForm from "@/components/ContactForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Underline from "@/components/Underline";
import { useGlobalContext } from "@/context/GlobalContext";

const Contact = () => {
  const { closeMenu } = useGlobalContext();

  return (
    <div onClick={closeMenu} className="">
      <div className=" grid place-items-center">
        <h1 className="text-4xl uppercase text-center ">Contact Me</h1>
        <Underline className="max-md:w-1/3 w-1/6" />
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
