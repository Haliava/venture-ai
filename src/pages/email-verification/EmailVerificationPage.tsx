import { verifyRegistration } from "@/entities/user/api";
import { useAuth } from "@/shared/store/user";
import { Button } from "@/shared/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router"

export const EmailVerificationPage = () => {
  const { setIsLoggedIn, setToken } = useAuth();
  const [params, _] = useSearchParams();
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ['verification'],
    queryFn: () => {
      if (!params.get('token')) {
        return Promise.reject('wrong token')
      }

      return verifyRegistration({token: params.get('token') as string})
    },
  })

  const handleLoginButtonClick = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (params.get('token')) {
      setIsLoggedIn(true);
      setToken(params.get('token') as string);
    }
  }, [params])

  return (
    <div className="flex flex-col gap-[3vmin] w-full px-[8vmin] py-[3vmin]">
      {isLoading && <h3 className="text-ai-lg">Активация аккаунта...</h3>}
      {!isLoading && <h3 className="text-ai-lg">Активация аккаунта прошла успешно!</h3>}
      <Button className="w-fit" variant="secondary" disabled={isLoading} onClick={handleLoginButtonClick}>
        <p>Войти в аккаунт</p>
      </Button>
    </div>
  )
}