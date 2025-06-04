import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = "Input";

export { Input, PasswordInput };
