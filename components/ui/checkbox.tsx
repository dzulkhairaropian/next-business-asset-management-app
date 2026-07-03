import * as React from "react"
import { cn } from "@/lib/utils"

export function Checkbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: Omit<React.ComponentProps<"input">, "checked" | "onChange"> & {
  checked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean) => void
}) {
  const ref = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = checked === "indeterminate"
    }
  }, [checked])

  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked === true}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={cn(
        "h-4 w-4 shrink-0 rounded border border-input text-primary accent-primary focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
