import { sendFeedback } from "@/entities/feedback/api";
import { STORAGE } from "@/shared/constants/general";
import { Button } from "@/shared/ui/button"
import { StarsRating } from "@/shared/ui/stars-rating"
import { Textarea } from "@/shared/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"

export const FeedbackForm = ({ className, starClassName }: {className?: string; starClassName?: string}) => {
  const [step, setStep] = useState(localStorage.getItem(STORAGE.SENT_FEEDBACK) ? 2 : 0);
  const [rating, setRating] = useState(-1);
  const [comment, setComment] = useState('');

  const { mutate: sendUserFeedback } = useMutation({
    mutationKey: ['feedback'],
    mutationFn: sendFeedback,
    onSuccess: () => localStorage.setItem(STORAGE.SENT_FEEDBACK, 'true'),
  })

  const handleSendFeedback = () => {
    sendUserFeedback({ rate: rating, comment })
    setStep(2);
  }

  return (
    <div className={`flex flex-col items-center gap-4 m-auto w-full ${className}`}>
      {step !== 2 && (
        <>
          <p className="font-semibold text-ai-lg">Вам нравится Venture AI?</p>
          <p className="font-normal text-ai-regular px-3 text-center lg:max-w-[45%]">
            {step === 0 && 'Будем рады узнать Ваше мнение о нашем сервисе.'}
            {step === 1 && (
              <>
                Что именно Вам понравилось в работе нашего сервиса,
                <br />
                а что нет? Нам интересно узнать о Вашем опыте работы
                <br />
                с AI-аналитиком.
              </>
            )}
          </p>
        </>
      )}
      {step === 0 && (
        <>
          <StarsRating rating={rating} setRating={setRating} className={starClassName} />
          <Button
            disabled={rating < 0}
            onClick={() => {
              setStep(1);
            }}
            className={`rounded-2xl mt-3 px-8 py-4 ${rating >= 0 ? 'bg-danger hover:bg-danger-secondary': 'bg-check hover:bg-[rgb(170,170,170)]'}`}
          >
            <p className="text-ai-regular font-semibold">Отправить</p>
          </Button>
        </>
      )}
      {step === 1 && (
        <>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} className="border-none m-auto min-h-30 w-[90vw] lg:w-[30vw]" />
          <Button onClick={handleSendFeedback} className="rounded-2xl mt-3 px-10 py-6 bg-[rgba(104,135,181,1)] hover:bg-[rgba(77,98,130,1)]">
            <p className="text-ai-regular font-semibold">Отправить</p>
          </Button>
        </> 
      )}
      {step === 2 && (
        <div className="flex flex-col gap-5 items-center justify-center w-[90vw]">
          <p className="text-ai-lg font-semibold">Спасибо большое за Ваш отзыв!</p>
          <p className="text-ai-regular font-normal text-center">
            Ваше мнение важно для нашей команды.<br />Благодаря обратной связи мы узнаем,<br />как можно улучшить платформу
          </p>
        </div>
      )}
    </div>
  )
}