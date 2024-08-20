import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center space-x-8 py-6 px-8 border-b border-gray-900/90 mb-4 justify-between">
      <div className="flex space-x-4 h-full justify-center ">
        <Link href={"/"}>Home</Link>
        <Link href={"/projects"}>Projects</Link>
        <Link href={"/contact-me"}>Contact</Link>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
