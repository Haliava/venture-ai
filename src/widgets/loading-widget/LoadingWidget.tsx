import { LOADING_LINES } from "@/shared/constants/general"
import { useEffect, useState } from "react"
import catVideo from '@/shared/assets/videos/cat.webm'

export const LoadingWidget = ({ className }: { className?: string }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const handleAdvanceLoadingLine = () => {
    setCurrentLineIndex(prev => prev + 1);
  }

  useEffect(() => {
    const loadingInterval = setInterval(handleAdvanceLoadingLine, 2000);
    return () => {
      clearInterval(loadingInterval);
    }
  }, [])

  return (
    <div className={`flex flex-col gap-10 ${className}`}>
      <p className="animate-pulse duration-500 text-ai-xl max-w-[100%]">{LOADING_LINES[currentLineIndex]}</p>
      <video className="w-full h-auto max-w-[80%] m-auto" src={catVideo} autoPlay loop />
    </div>
  )
}