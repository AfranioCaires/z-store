import * as React from "react";
import { useField } from "formik";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { name } = props;
    const [field, meta] = useField({ name });
    const error = meta.touched && meta.error;
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
          {...field}
        />
        <span className={cn("text-sm font-medium text-primary mt-2")}>
          {error}
        </span>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
