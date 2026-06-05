import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from 'next/link'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wider transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 cursor-pointer",
  {
    variants: {
      variant: {
        primary:   "bg-primary text-background hover:bg-primary/90",
        secondary: "bg-[#0e100e] text-foreground border border-[#1E211E] hover:bg-[#161916]",
        outline:   "border border-[#1E211E] text-foreground hover:bg-[#0e100e]",
        ghost:     "text-foreground-muted hover:text-foreground hover:bg-foreground/5 text-[11px]",
        contrast:  "bg-accent text-[#060706] font-bold hover:bg-accent-hover",
        navy:      "bg-[#3A3D3B] text-foreground hover:bg-[#4a4d4a]",
        ambulance: "text-foreground-muted hover:text-foreground hover:scale-105 transition-all duration-200",
      },
      size: {
        sm:   "px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider",
        md:   "px-5 py-2.5 text-xs font-bold uppercase tracking-wider",
        lg:   "px-7 py-3.5 text-sm font-bold uppercase tracking-wider",
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
