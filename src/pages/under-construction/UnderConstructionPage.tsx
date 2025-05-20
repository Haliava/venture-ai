import cat from '@/shared/assets/images/cat.webp'
import { useNavigate } from 'react-router'

export const UnderConstructionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="*:font-semibold *:text-ai-lg flex flex-col p-10 lg:flex-row lg:justify-center">
      <div className="flex flex-col gap-3">
        <p>Ой! Эта страница сейчас находится в&nbsp;разработке</p>
        <span className="flex gap-2">
          <p>Вернитесь на</p>
          <p className="text-ai-yellow cursor-pointer" onClick={() => navigate('/')}>главную</p>
          <p>страницу</p>
        </span>
      </div>
      <img className="w-[20rem] lg:m-0 lg:ml-10 mt-10 mx-auto" src={cat} alt="unplugged" />
    </div>
  )
}