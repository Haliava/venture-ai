import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/shared/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <span className="border border-white w-[100vw] -ml-5 mt-8 lg:w-[82vw] xl:w-[69vw]" />
  )
}

export { Separator }
