import RegisterForm from "@/widgets/register-form";

export const RegisterPage = () => {
  return (
    <div className="flex min-h-[75vmin] m-auto items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}