import { cn } from "@/lib/utils";

const Underline = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-blue-600 w-14 h-4 rounded-full my-3", className)} />
  );
};
export default Underline;
