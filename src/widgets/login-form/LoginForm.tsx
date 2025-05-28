import { useUserActions } from "@/shared/hooks/useUserActions";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/shared/store/user";
import { RegisterUserFields } from "@/shared/types/user";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { loginUser, registerUser, isLoggingIn, isRegistring } = useUserActions();
  const registerButtonRef = useRef<null | HTMLButtonElement>(null);
  const { setToken } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = (e: any, action = loginUser) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formFieldsValues = Object.fromEntries(formData) as RegisterUserFields;

    action(formFieldsValues).then(data => {
      setToken(data.data.token)
      navigate('/')
    }).catch(e => toast.error(`ошибка входа/регистрации! ${e}`))
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            if ((e.nativeEvent as SubmitEvent).submitter === registerButtonRef.current) {
              handleSubmit(e, registerUser)
            } else {
              handleSubmit(e);
            }
          }}>
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
                Вход
              </Button>
            </div>
            <div className="mt-4 text-center text-ai-regular">
              Нет аккаунта?{" "}
              <Button ref={registerButtonRef} type="submit" className="underline underline-offset-4 bg-transparent text-black cursor-pointer shadow-none hover:bg-transparent">
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
