import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" h-16 relative">
      <MaxWidthWrapper className="max-sm:max-w-full max-sm:p-12">
        <div className="border-t space-y-8 border-gray-200 w-full" />
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <a
                href="https://github.com/Aiyanu/"
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/adesanya-iyanu-96a5aa243/"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Built with Nextjs 14
              </a>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
