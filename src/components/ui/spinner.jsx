import { cn } from "@/lib/utils";

export function Spinner({ className }) {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent",
        className
      )}
      role="status"
    />
  );
}