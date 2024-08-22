import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MaxWidthWrapper({
  className,
  children,
  onClick,
}: MaxWidthWrapperProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-full mx-auto max-sm:w-full max-w-screen-xl px-2.5 max-sm:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
