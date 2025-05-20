export const NotFoundPage = () => {
  return (
    <div className="*:font-semibold *:text-[1.33rem] flex flex-col p-10 lg:flex-row lg:justify-center lg:gap-10">
      <div>
        <h1 className="[&&]:text-[2.5rem]">Ошибка: 404</h1>
        <span className="flex gap-2">
          <p>Попробуйте перезагрузить</p>
          <p className="text-ai-yellow">страницу</p>
        </span>
      </div>
      <img className="w-[20rem] h-auto mt-15 mx-auto lg:m-0" src="src/shared/assets/images/unplugged.webp" alt="unplugged" />
    </div>
  )
}