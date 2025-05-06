import { useAnalyst } from "@/shared/hooks/useAnalyst";
import { Button } from "@/shared/ui/button";
import LoadingWidget from "@/widgets/loading-widget";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AnalystResponse = () => {
  const { isAnswerLoading, analystReply } = useAnalyst();
  const handleSavePDF = () => {
    if (!analystReply) return;
    html2canvas(analystReply as unknown as HTMLElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      // @ts-ignore !RESOLVE ERROR!
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save("startup-analysis.pdf");
    })
  }

  useEffect(() => {
    console.log(isAnswerLoading, analystReply )
  }, [isAnswerLoading, analystReply])

  return (
    <div className="flex flex-col">
      <p>{analystReply}</p>
      {isAnswerLoading && <LoadingWidget />}
      {!isAnswerLoading && analystReply && (
        <>
          <p>Мнение AI-аналитика</p>
          <Markdown remarkPlugins={[remarkGfm]}>{analystReply}</Markdown>
          <Button variant="outline" className="border-2 px-5 py-3" onClick={handleSavePDF}>
            <p>Скачать анализ в PDF</p>
          </Button>
        </>
      )}
    </div>
  )
}