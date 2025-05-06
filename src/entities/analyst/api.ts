import { StartupFormFieldValues } from "@/shared/types/form"

export const getAnalysis = (formValues: StartupFormFieldValues) => {
  console.log(formValues)
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`${formValues}\ **312321**`), 1000)
  })
  // return fetch('')
}