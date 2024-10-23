import * as React from "react"

import { cn } from "@/lib/utils"
import { MoneyConverter } from "@/utils/money"

export interface MoneyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
    overrideOnChange?: (value: any) => void
  }

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
({ className, hasError = false, type, value, overrideOnChange, ...props }, ref) => {

    const handleChange = (e: any) => {
        if(overrideOnChange) {
            let inputValue = e.target.value;
            inputValue = MoneyConverter.convertToDecimal(inputValue);
            inputValue = MoneyConverter.convertToString(inputValue);
            overrideOnChange(inputValue);
        }
    }

    return (
        <input
            type="text"
            className={cn(
            `${hasError ? "border-destructive" : "border-input"} flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className
            )}
            ref={ref}
            {...props}
            value={value}
            onChange={handleChange}
        />
    )
  }
)

export { MoneyInput }
