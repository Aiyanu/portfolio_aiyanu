import ContactWrapper from "@/components/ContactWrapper";
import ContactForm from "@/components/ContactForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Contact = () => {
  return (
    <div className="grid place-items-center">
      <ContactWrapper>
        <ContactForm />
      </ContactWrapper>
    </div>
  );
};

export default Contact;
