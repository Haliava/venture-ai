import { useCurrentDevice } from "@/shared/hooks/useCurrentDevice";
import { Icon } from "@/shared/ui/icon"
import { useNavigate } from "react-router"

export const HowToFillForm = () => {
  const { currentWidth } = useCurrentDevice();
  const navigate = useNavigate();
  const handleClickSuggestion = () => {
    navigate('/instruction')
  }

  return (
    <div onClick={handleClickSuggestion} className="grid sm:mx-2 md:mx-0 xs:grid-cols-1 sm:grid-cols-[2fr_1fr] lg:grid-cols-[11fr_4fr] justify-between items-center lg:items-start rounded-2xl px-2.5 lg:px-[3vmin] py-3.5 m-auto gap-10 bg-help">
      <div className="flex flex-col gap-3.5 text-text-blue">
        <p className="font-bold text-ai-lg lg:text-ai-xl">Как мне заполнять блоки?</p>
        <p className="font-semibold text-ai-regular lg:text-ai-md">
          Подробная инструкция того, как&nbsp;заполнить блоки правильно и&nbsp;получить максимум от&nbsp;AI&#8209;аналитика.
        </p>
      </div>
      {currentWidth > 512 && <Icon type="fieldsWithQuestionmarks" />}
    </div>
  )
}