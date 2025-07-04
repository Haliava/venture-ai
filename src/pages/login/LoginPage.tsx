import { useAuth } from "@/shared/store/user"
import LoginForm from "@/widgets/login-form"
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <div className="flex min-h-[75vmin] m-auto items-center justify-center p-6 md:p-10">
      <div className="w-full md:max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}