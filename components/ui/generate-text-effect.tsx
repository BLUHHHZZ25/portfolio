"use client"

import { motion, stagger, useAnimate } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

type TextGenerateEffectProps = Omit<React.ComponentProps<"div">, "children"> & {
  words: string
  filter?: boolean
  duration?: number
  staggerDelay?: number
}

function TextGenerateEffect({
  ref,
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.05,
  ...props
}: TextGenerateEffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

  const [scope, animate] = useAnimate()
  const wordsArray = React.useMemo(() => words.split(" "), [words])

  React.useEffect(() => {
    if (!scope.current) return
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      reduced ? { duration: 0 } : { duration, delay: stagger(staggerDelay) },
    )
  }, [animate, duration, filter, scope, staggerDelay])

  return (
    <div
      className={cn("font-bold", className)}
      data-slot="text-generate-effect"
      ref={localRef}
      {...props}
    >
      <motion.div ref={scope} suppressHydrationWarning>
        {wordsArray.map((word, idx) => (
          <motion.span
            className="opacity-0 will-change-[opacity,filter]"
            key={`${word}-${idx}`}
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export { TextGenerateEffect, type TextGenerateEffectProps }
export default TextGenerateEffect
