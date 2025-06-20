import { LOADING_LINES } from "@/shared/constants/general"
import { useEffect, useState } from "react"
import { getRandomInt } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/icon";

export const LoadingWidget = ({ className }: { className?: string }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const handleAdvanceLoadingLine = () => {
    let newLineIndex = getRandomInt(0, LOADING_LINES.length - 1);
    setCurrentLineIndex(newLineIndex);
  }

  useEffect(() => {
    const loadingInterval = setInterval(handleAdvanceLoadingLine, 3000);
    return () => {
      clearInterval(loadingInterval);
    }
  }, [])

  return (
    <div className={`flex flex-col gap-10 ${className}`}>
      <p className="animate-pulse duration-[2s] text-ai-xl max-w-[100%]">{LOADING_LINES[currentLineIndex]}</p>
      <Icon type="loading" className="animate-spin size-[8vmin] m-auto" />
    </div>
  )
}