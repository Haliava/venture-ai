import { Icon } from "@/shared/ui/icon"
import { useNavigate } from "react-router"

export const HowToFillForm = () => {
  const navigate = useNavigate();
  const handleClickSuggestion = () => {
    navigate('/instruction')
  }

  return (
    <div onClick={handleClickSuggestion} className="grid grid-cols-[2fr_1fr] justify-between items-center rounded-2xl px-2.5 py-3.5 m-auto mx-2 gap-10 bg-help">
      <div className="flex flex-col gap-3.5 text-text-blue">
        <p className="font-bold text-[20px]">Как мне заполнять блоки?</p>
        <p className="font-semibold text-[14px]">Подробная инструкция того, как&nbsp;заполнить блоки правильно и&nbsp;получить максимум от AI-аналитика.</p>
      </div>
      <Icon type="fieldsWithQuestionmarks" />
    </div>
  )
}