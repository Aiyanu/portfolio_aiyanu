import { useGlobalContext } from "@/context/GlobalContext";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps) {

  return (
    <div
      // onClick={closeMenu}
      className={cn(
        "h-full mx-auto max-sm:w-full max-w-screen-xl px-2.5 max-sm:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
