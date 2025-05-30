import { useAnalyst } from "@/shared/hooks/useAnalyst";
import { Button } from "@/shared/ui/button";
import LoadingWidget from "@/widgets/loading-widget";
import { useEffect, useRef } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generatePDF } from "@/shared/lib/utils";

export type AnalystResponseProps = {
  isLoading?: boolean;
  reply?: string;
  className?: string;
}

export const AnalystResponse = ({ isLoading, reply, className }: AnalystResponseProps) => {
  const { isAnswerLoading, analystReply } = useAnalyst();
  const mdRef = useRef<null | HTMLDivElement>(null);
const handleSavePDF = () => {
  if ((analystReply || reply) && mdRef.current) generatePDF(mdRef.current)
};

  useEffect(() => {
    console.log(isAnswerLoading, analystReply)
  }, [isAnswerLoading, analystReply])

  return (
    <div className={`flex flex-col ${className}`}>
      <p>{analystReply}</p>
      {isAnswerLoading || isLoading && <LoadingWidget className="mt-[5vmin] max-w-[100%] lg:px-[3vw]" />}
      {!isAnswerLoading && !isLoading && (analystReply || reply) && (
        <div className="flex flex-col bg-bg-grey gap-5">
          <p className="text-ai-xl font-semibold">Мнение AI-аналитика</p>
          <div ref={mdRef} className="bg-white rounded-[1.5rem] p-5 *:text-black">
            <Markdown remarkPlugins={[remarkGfm]}>{analystReply || reply}</Markdown>
          </div>
          <Button variant="outline" className="border-2 px-5 py-3 self-end" onClick={handleSavePDF}>
            <p>Скачать анализ в PDF</p>
          </Button>
        </div>
      )}
    </div>
  )
}