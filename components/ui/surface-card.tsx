import type React from "react"
import { cn } from "@/lib/utils"

type SurfaceCardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "article" | "section"
  hover?: boolean
  padded?: boolean
}

export function SurfaceCard({
  className,
  as: As = "div",
  hover = true,
  padded = false,
  children,
  ...rest
}: SurfaceCardProps) {
  return (
    <As
      className={cn(
        "surface rounded-2xl overflow-hidden",
        hover && "surface-hover",
        padded && "p-6",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  )
}
