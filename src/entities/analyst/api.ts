import { StartupFormFieldValues } from "@/shared/types/form"
import axios, { AxiosResponse } from "axios"

export const getAnalysis = (formValues: StartupFormFieldValues) => {
  console.log(formValues)
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`${formValues}\ **312321**`), 1000)
  })
  // return axios.post('/', formValues)
}

export const transforTranscriptionToFormFields = (transcription: string) => {
  return axios.post<AxiosResponse<StartupFormFieldValues>>('/projects/transcribe', transcription);
}