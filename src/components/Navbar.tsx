"use client";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { useGlobalContext } from "@/context/GlobalContext";

const Navbar = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<number | null>(null);
  const { state, toggleMenu } = useGlobalContext();
  useEffect(() => {
    const paths = ["/", "/projects", "/contact-me"];
    const index = paths.indexOf(pathname);
    setIsActive(index !== -1 ? index : null);
  }, [pathname]);

  return (
    <>
      <nav className="flex items-center space-x-8 py-6 px-8 border-b dark:border-gray-900/90 mb-4 justify-between">
        <Button className="md:hidden" variant={"outline"} onClick={toggleMenu}>
          <Menu />
        </Button>

        <div className="block md:hidden"></div>
        <div className="md:flex space-x-4 h-full justify-center hidden ">
          <Link
            className={cn("select-none text-gray-400", {
              "text-black dark:text-white": isActive === 0,
            })}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={cn("select-none text-gray-400", {
              "text-black dark:text-white": isActive === 1,
            })}
            href={"/projects"}
          >
            Projects
          </Link>
          <Link
            className={cn("select-none text-gray-400", {
              "text-black dark:text-white": isActive === 2,
            })}
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
      <div
        className={cn(
          "relative transition-transform ease-out duration-200 space-y-4 flex flex-col justify-center items-center mb-8",
          {
            "h-full w-full": state.isMenuOpen,
            "h-0 w-0 overflow-hidden": !state.isMenuOpen,
          }
        )}
      >
        <Link
          onClick={toggleMenu}
          className={cn("select-none text-gray-400", {
            "text-black dark:text-white": isActive === 0,
          })}
          href={"/"}
        >
          Home
        </Link>
        <Separator />
        <Link
          onClick={toggleMenu}
          className={cn("select-none text-gray-400", {
            "text-black dark:text-white": isActive === 1,
          })}
          href={"/projects"}
        >
          Projects
        </Link>
        <Separator />
        <Link
          onClick={toggleMenu}
          className={cn("select-none text-gray-400", {
            "text-black dark:text-white": isActive === 2,
          })}
          href={"/contact-me"}
        >
          Contact
        </Link>
        <Separator />
      </div>
    </>
  );
};

export default Navbar;
