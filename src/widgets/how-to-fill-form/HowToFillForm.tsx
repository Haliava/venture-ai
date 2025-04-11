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
    <div onClick={handleClickSuggestion} className="grid sm:grid-cols-[2fr_1fr] xs:grid-cols-1 justify-between items-center rounded-2xl px-2.5 py-3.5 m-auto mx-2 gap-10 bg-help">
      <div className="flex flex-col gap-3.5 text-text-blue">
        <p className="font-bold text-ai-lg">Как мне заполнять блоки?</p>
        <p className="font-semibold text-ai-regular">
          Подробная инструкция того, как&nbsp;заполнить блоки правильно и&nbsp;получить максимум от&nbsp;AI&#8209;аналитика.
        </p>
      </div>
      {currentWidth > 512 && <Icon type="fieldsWithQuestionmarks" />}
    </div>
  )
}