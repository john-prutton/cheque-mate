import { cn } from "@/utils/cn"

import { Input, InputProps } from "./ui/input"

export const FloatingLabeledInput = ({
  label,
  containerClassName,
  ...props
}: InputProps & { label: string; containerClassName?: string }) => (
  <div className={containerClassName}>
    <div className="h-4" />

    <div className="relative">
      <Input
        {...props}
        placeholder=" "
        className={cn(
          "[&:not(:placeholder-shown)+label]:top-0 [&:not(:placeholder-shown)+label]:-translate-y-5 [&:not(:placeholder-shown)+label]:text-xs",
          props.className
        )}
      />
      <label className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 touch-none text-muted-foreground transition-transform">
        {label}
      </label>
    </div>
  </div>
)
