import { LOADING_LINES } from "@/shared/constants/general"
import { useEffect, useState } from "react"
import catVideo from '@/shared/assets/videos/cat.webm'
import { getRandomInt } from "@/shared/lib/utils";

export const LoadingWidget = ({ className }: { className?: string }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const handleAdvanceLoadingLine = () => {
    let newLineIndex = getRandomInt(0, LOADING_LINES.length - 1);
    while (newLineIndex === currentLineIndex) {
      newLineIndex = getRandomInt(0, LOADING_LINES.length - 1);
    }

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
      <video className="w-full h-auto max-w-[80%] m-auto" src={catVideo} autoPlay loop />
    </div>
  )
}