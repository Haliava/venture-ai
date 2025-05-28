import { StartupFormFieldValues } from "@/shared/types/form"
import { mapFormFieldsToAPI } from "./mappers"
import { ReplyAPI } from "@/shared/types/analysis"
import { axiosInstance } from "@/shared/api/axiosInstance"

export const getAnalysis = (formValues: StartupFormFieldValues) => {
  // return new Promise<string>((resolve) => {
  //   setTimeout(() => resolve(`${Object.entries(formValues).map(([k, v]) => ''+k+v).join('\n')}\ **312321**`), 10000)
  // })
  return axiosInstance.post<ReplyAPI>('/projects', mapFormFieldsToAPI(formValues))
}

export const transforTranscriptionToFormFields = (transcription: string) => {
  return axiosInstance.post<StartupFormFieldValues>('/projects/transcribe', transcription);
}