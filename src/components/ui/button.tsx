import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-lg";

    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.98]",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary-hover border border-card-border",
      ghost:
        "text-muted-foreground hover:text-foreground hover:bg-secondary",
      outline:
        "border border-primary/50 text-primary bg-transparent hover:bg-primary/10 hover:border-primary",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-14 px-8 text-base min-w-[160px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
