import { userFormFieldErrors } from "@/shared/lib/utils";
import { useUserStore } from "@/shared/store/user";
import { User } from "@/shared/types/user";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Formik, FormikHelpers } from "formik";

export const UserForm = ({ className }: { className?: string }) => {
  const { user } = useUserStore();

  const handleUploadPhoto = () => {
  }

  const handleUpdateUserData = (values: User, formikHelpers: FormikHelpers<User>) => {
  }

  const validateForm = (formValues: User) => {
    const fieldErrors: {[K in keyof Partial<User>]: string[]} = {};

    Object.entries(formValues).map(([key, value]) => {
      const errors = userFormFieldErrors(key as keyof User, Array.isArray(value) ? value.join(','): value);
      if (errors.length) {
        fieldErrors[key as keyof User] = errors;
      }
    })

    return fieldErrors;
  }


  return (
    <Formik
      initialValues={user}
      onSubmit={handleUpdateUserData}
      validate={validateForm}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      enableReinitialize
    >
      {(formik) => {
        return (
          <div className={`${className} flex flex-col w-full gap-6`}>
            <div className="h-fit flex items-middle gap-5">
              <img className="max-w-[7rem] h-auto size-[9rem]" src={user?.avatar} />
              <div className="flex justify-center flex-col gap-2">
                <p className="font-semibold text-ai-md">{user?.name}</p>
                <p className="font-normal text-ai-regular">{user?.email}</p>
                <Button className="p-0 w-min" variant="link" onClick={handleUploadPhoto}>
                  <p className="text-white underline font-normal text-ai-sm">Загрузить фото</p>
                </Button>
              </div>
            </div>
            <div className="flex xs:flex-col md:flex-row md:w-full md:bg-bg-grey md:rounded-xl md:px-6 md:py-4 md:justify-between md:gap-[10vmin]">
              <p className="font-semibold text-ai-md">Учетные данные</p>

              <div className="flex flex-col gap-5 md:grow">
                <div className="grid w-full items-center bg-field-bg rounded-lg px-2 pt-2">
                  <Label className="text-text-field-hint" htmlFor="name">Имя</Label>
                  <Input
                    className="bg-field-bg! border-none shadow-none p-0"
                    type="text"
                    id="name"
                    placeholder="Имя"
                    value={formik.values.name}
                    onChange={(e) => formik.setFieldValue('name', e.target.value, false)}
                  />
                </div>
                <div className="grid w-full items-center bg-field-bg rounded-lg px-2 pt-2">
                  <Label className="text-text-field-hint" htmlFor="surname">Фамилия</Label>
                  <Input
                    className="bg-field-bg! border-none shadow-none p-0"
                    type="text"
                    id="surname"
                    placeholder="Фамилия"
                    value={formik.values.surname}
                    onChange={(e) => formik.setFieldValue('surname', e.target.value, false)}
                  />
                </div>
                <div className="grid w-full items-center bg-field-bg rounded-lg px-2 pt-2">
                  <Label className="text-text-field-hint" htmlFor="email">Почта</Label>
                  <Input
                    className="bg-field-bg! border-none shadow-none p-0"
                    type="text"
                    id="email"
                    placeholder="example@gmail.com"
                    value={formik.values.email}
                    onChange={(e) => formik.setFieldValue('email', e.target.value, false)}
                  />
                </div>
                <div className="grid w-full items-center bg-field-bg rounded-lg px-2 pt-2">
                  <Label className="text-text-field-hint" htmlFor="phone">Номер телефона</Label>
                  <Input
                    className="bg-field-bg! border-none shadow-none p-0"
                    type="text"
                    id="phone"
                    placeholder="+711111111"
                    value={formik.values.phone}
                    onChange={(e) => formik.setFieldValue('phone', e.target.value, false)}
                  />
                </div>
                <Button className="min-h-fit max-w-fit cursor-pointer bg-danger hover:bg-danger-secondary px-[1.5rem] py-[0.75rem] text-ai-lg rounded-[10px]" type="submit">
                  <p className="font-medium text-ai-lg lg:text-ai-md lg:font-semibold">Сохранить</p>
                </Button>
              </div>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}