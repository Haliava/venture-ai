import { SUBMIT_ACTIONS } from "@/shared/constants/form";
import LoginForm from "../login-form";

export const RegisterForm = (props: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <LoginForm {...props} submitAction={SUBMIT_ACTIONS.REGISTER} />
  )
}
