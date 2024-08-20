import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ContactWrapperProps {
  children: ReactNode;
}

const ContactWrapper = ({ children }: ContactWrapperProps) => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Contact Me</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContactWrapper;
