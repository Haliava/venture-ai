import { useAuth } from "@/shared/store/user"
import RegisterForm from "@/widgets/register-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <div className="flex min-h-[75vmin] m-auto items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}