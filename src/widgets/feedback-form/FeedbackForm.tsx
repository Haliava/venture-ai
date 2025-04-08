import { Button } from "@/shared/ui/button"
import { StarsRating } from "@/shared/ui/stars-rating"
import { Textarea } from "@/shared/ui/textarea";
import { useState } from "react"

export const FeedbackForm = ({ className, starClassName }: {className?: string; starClassName?: string}) => {
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(-1)

  const handleSendFeedback = () => {
    setStep(2);
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {step !== 2 && (
        <>
          <p className="font-semibold text-[20px]">Вам нравится Venture AI?</p>
          <p className="font-normal text-[16px]">Будем рады узнать Ваше мнение о нашем сервисе.</p>
        </>
      )}
      {step === 0 && (
        <>
          <StarsRating rating={rating} setRating={setRating} className={starClassName} />
          <Button onClick={() => setStep(1)} className={`mt-3 px-[40px] py-[7px] ${rating >= 0 ? 'bg-danger': 'bg-check'}`}>
            <p className="text-[16px] font-semibold">Отправить</p>
          </Button>
        </>
      )}
      {step === 1 && (
        <>
          <Textarea className="border-none m-auto min-h-30 w-[90vw]" />
          <Button onClick={handleSendFeedback} className={`mt-3 px-[40px] py-[7px] ${rating >= 0 ? 'bg-danger': 'bg-check'}`}>
            <p className="text-[16px] font-semibold">Отправить отзыв</p>
          </Button>
        </> 
      )}
      {step === 2 && (
        <div className="flex flex-col gap-5 items-center justify-center w-[90vw]">
          <p className="text-[20px] font-semibold">Спасибо большое за Ваш отзыв!</p>
          <p className="text-[14px] font-normal text-center">
            Ваше мнение важно для нашей команды.<br />Благодаря обратной связи мы узнаем,<br />как можно улучшить платформу
          </p>
        </div>
      )}
    </div>
  )
}