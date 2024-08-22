import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Underline from "./Underline";
import { cn } from "@/lib/utils";

interface ContactWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContactWrapper = ({ children, className }: ContactWrapperProps) => {
  return (
    <Card className={cn("max-sm:w-full pt-8 max-md:border-none", className)}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContactWrapper;
