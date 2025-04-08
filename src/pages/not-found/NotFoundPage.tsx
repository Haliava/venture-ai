export const NotFoundPage = () => {
  return (
    <div className="*:font-semibold *:text-[20px] flex flex-col p-10">
      <div>
        <h1 className="[&&]:text-[36px]">Ошибка: 404</h1>
        <span className="flex gap-2">
          <p>Попробуйте перезагрузить</p>
          <p className="text-ai-yellow">страницу</p>
        </span>
      </div>
      <img className="w-[65vmin] h-auto mt-15 mx-auto" src="src/shared/assets/images/unplugged.webp" alt="unplugged" />
    </div>
  )
}