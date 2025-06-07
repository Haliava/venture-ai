import { userFormConstraints } from "@/shared/constants/general";
import { useUserActions } from "@/shared/hooks/useUserActions";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/shared/store/user";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type RegisterFormProps = React.ComponentPropsWithoutRef<"div">

export type RegisterFormValues = {
  email: string,
  password: string,
  repeatPassword: string,
}

export const RegisterForm = ({
  className,
  ...props
}: RegisterFormProps) => {
  const { registerUser, isRegistring } = useUserActions();
  const { setToken } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = (values: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues>) => {
    formikHelpers.validateForm().then(() => {
      registerUser(values).then(data => {
        setToken(data.data.token)
        navigate('/')
      }).catch(e => toast.error(`${e?.response?.data?.message ?? 'ошибка входа/регистрации!'}`))
    })
  }

  const validate = (formValues: RegisterFormValues) => {
    const fieldErrors: {[K in keyof Partial<RegisterFormValues>]: string[]} = {};

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formValues.email)) {
      fieldErrors.email = ['неверный формат почты'];
      toast.error('неверный формат почты')
    }

    if (formValues.password !== formValues.repeatPassword) {
      fieldErrors.password = ['пароли не совпадают'];
      toast.error('пароли не совпадают');
    }

    if (formValues.password.length < (userFormConstraints.password.MIN_SYMBOL_COUNT as number)) {
      fieldErrors.password = ['пароли не совпадают'];
      toast.error(`пароль слишком короткий, минимальная длина - ${userFormConstraints.password.MIN_SYMBOL_COUNT}`);
    }

    if (!(userFormConstraints.password.APPROPRIATE_FORMAT as RegExp).test(formValues.password)) {
      fieldErrors.password = ['пароли не совпадают'];
      toast.error('неверный формат пароля: проверьте, что он написан на латинице и в нем есть хотя бы одна цифра');
    }

    return fieldErrors;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ email: '', password: '', repeatPassword: '' } as RegisterFormValues}
            onSubmit={handleSubmit}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            enableReinitialize
          >
            {(formik) => {
              return (
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      value={formik.values.email}
                      onChange={(e) => formik.setFieldValue('email', e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      value={formik.values.password}
                      onChange={(e) => formik.setFieldValue('password', e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      minLength={userFormConstraints.password.MIN_SYMBOL_COUNT as number}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeatPassword">Повторите пароль</Label>
                    <Input
                      value={formik.values.repeatPassword}
                      onChange={(e) => formik.setFieldValue('repeatPassword', e.target.value)}
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      minLength={userFormConstraints.password.MIN_SYMBOL_COUNT as number}
                      required
                    />
                  </div>
                  <Button onClick={formik.submitForm} type="submit" className="w-full" disabled={isRegistring}>
                    Регистрация
                  </Button>
                </div>
              )
            }}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}
