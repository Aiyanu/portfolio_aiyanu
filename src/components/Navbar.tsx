"use client";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<number | null>(null);

  useEffect(() => {
    const paths = ["/", "/projects", "/contact-me"];
    const index = paths.indexOf(pathname);
    setIsActive(index !== -1 ? index : null);
  }, [pathname]);

  return (
    <nav className="flex items-center space-x-8 py-6 px-8 border-b border-gray-900/90 mb-4 justify-between">
      <div className="flex space-x-4 h-full justify-center ">
        <Link className={cn({ "text-blue-600/70": isActive === 0 })} href={"/"}>
          Home
        </Link>
        <Link
          className={cn({ "text-blue-600/70": isActive === 1 })}
          href={"/projects"}
        >
          Projects
        </Link>
        <Link
          className={cn({ "text-blue-600/70": isActive === 2 })}
          href={"/contact-me"}
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant={"outline"}>
          <a href={"/assets/CV.pdf"} download>
            Download CV
          </a>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
