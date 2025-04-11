export const UnderConstructionPage = () => {
  return (
    <div className="*:font-semibold *:text-ai-lg flex flex-col p-10">
      <div className="flex flex-col gap-3">
        <p>Ой! Эта страница сейчас находится в&nbsp;разработке</p>
        <span className="flex gap-2">
          <p>Вернитесь на</p>
          <p className="text-ai-yellow">главную</p>
          <p>страницу</p>
        </span>
      </div>
      <img className="w-[50vmin] mt-10 mx-auto" src="src/shared/assets/images/cat.webp" alt="unplugged" />
    </div>
  )
}