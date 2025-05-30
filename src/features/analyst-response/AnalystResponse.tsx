import { useAnalyst } from "@/shared/hooks/useAnalyst";
import { Button } from "@/shared/ui/button";
import LoadingWidget from "@/widgets/loading-widget";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type AnalystResponseProps = {
  isLoading?: boolean;
  reply?: string;
  className?: string;
}

export const AnalystResponse = ({ isLoading, reply, className }: AnalystResponseProps) => {
  const { isAnswerLoading, analystReply } = useAnalyst();
  const mdRef = useRef<null | HTMLDivElement>(null);
const handleSavePDF = () => {
  if ((!analystReply && !reply) || !mdRef.current) return;
  
  html2canvas(mdRef.current, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF();
    const margin = 5; // Page margins in points
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const availableWidth = pageWidth - (2 * margin);
    
    // Calculate scaled dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const scaleFactor = availableWidth / imgWidth;
    const scaledHeight = imgHeight * scaleFactor;

    // Handle single page
    if (scaledHeight <= pageHeight) {
      pdf.addImage(
        imgData,
        'JPEG',
        margin,
        margin,
        availableWidth,
        scaledHeight,
        'FAST',
        'FAST'
      );
    } 
    // Handle multi-page
    else {
      let positionY = 0;
      
      while (positionY < scaledHeight) {
        const remainingHeight = scaledHeight - positionY;
        const viewportHeight = Math.min(pageHeight - 2 * margin, remainingHeight);
        
        pdf.addImage(
          imgData,
          'JPEG',
          margin,
          margin - positionY,
          availableWidth,
          scaledHeight,
          'FAST',
          'FAST'
        );
        
        positionY += pageHeight - 2 * margin;
        
        if (positionY < scaledHeight) {
          pdf.addPage();
        }
      }
    }
    
    pdf.save("startup-analysis.pdf");
  });
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