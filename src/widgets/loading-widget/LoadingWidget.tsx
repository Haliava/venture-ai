import { LOADING_LINES } from "@/shared/constants/general"
import { useEffect, useState } from "react"
import catVideo from '@/shared/assets/videos/cat.webm'

export const LoadingWidget = () => {
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
    <div className="flex flex-col gap-10">
      <p className="animate-pulse duration-500">{LOADING_LINES[currentLineIndex]}</p>
      <video className="w-full h-auto" src={catVideo} loop />
    </div>
  )
}