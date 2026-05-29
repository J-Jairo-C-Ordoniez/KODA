import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from 'next/link'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-light tracking-wider transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
  {
    variants: {
      variant: {
        primary: "bg-primary text-background hover:bg-navy shadow-lg shadow-black/5",
        secondary: "bg-secondary text-background hover:bg-primary shadow-xl shadow-black/5",
        outline: "border-2 border-navy/20 text-navy hover:border-navy hover:bg-navy/5",
        ghost: "text-navy hover:bg-navy/5",
        contrast: "bg-contrast text-primary hover:opacity-90 hover:shadow-lg shadow-contrast/50",
        navy: "bg-navy text-background hover:opacity-90 shadow-xl shadow-navy/20",
        ambulance: "text-secondary hover:text-primary hover:scale-105 transition-all duration-300",
      },
      size: {
        sm: "px-4 py-2 text-xs uppercase",
        md: "px-6 py-3 text-xs uppercase lg:text-md",
        lg: "px-8 py-4 text-xs uppercase lg:text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, type = "button", ...props }, ref) => {
    
    if (href && !props.disabled) {
      return (
        <Link href={href} className={cn(buttonVariants({ variant, size, className }))} {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {props.children}
        </Link>
      )
    }

    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button
