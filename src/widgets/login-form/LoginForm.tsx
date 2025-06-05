import { SUBMIT_ACTIONS } from "@/shared/constants/form";
import { useUserActions } from "@/shared/hooks/useUserActions";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/shared/store/user";
import { RegisterUserFields } from "@/shared/types/user";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type LoginFormProps = {
  submitAction?: SUBMIT_ACTIONS,
} & React.ComponentPropsWithoutRef<"div">

export const LoginForm = ({
  className,
  submitAction = SUBMIT_ACTIONS.LOGIN,
  ...props
}: LoginFormProps) => {
  const { loginUser, registerUser, isLoggingIn, isRegistring } = useUserActions();
  const { setToken } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formFieldsValues = Object.fromEntries(formData) as RegisterUserFields;
    const actionsMap = {
      [SUBMIT_ACTIONS.LOGIN]: loginUser,
      [SUBMIT_ACTIONS.REGISTER]: registerUser,
    }

    actionsMap[submitAction](formFieldsValues).then(data => {
      setToken(data.data.token)
      navigate('/')
    }).catch(e => toast.error(`${e?.response?.data?.message ?? 'ошибка входа/регистрации!'}`))
  }

  const handleRegisterButtonClick = () => {
    navigate('/register');
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" name="password" type="password" minLength={12} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoggingIn || isRegistring}>
                {submitAction === SUBMIT_ACTIONS.LOGIN ? 'Вход' : 'Регистрация'}
              </Button>
            </div>
            {submitAction === SUBMIT_ACTIONS.LOGIN && (
              <div className="mt-4 text-center text-ai-regular">
                Нет аккаунта?{" "}
                <Button type="button" onClick={handleRegisterButtonClick} className="underline underline-offset-4 bg-transparent text-black cursor-pointer shadow-none hover:bg-transparent">
                  Зарегистрироваться
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
