import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      <p className="text-xs font-mono text-[var(--primary)] tracking-[0.2em] uppercase mb-3 inline-flex items-center gap-2">
        <span className="h-px w-8 bg-[var(--primary)]/60" />
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--muted-foreground)] mt-3 max-w-xl text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
