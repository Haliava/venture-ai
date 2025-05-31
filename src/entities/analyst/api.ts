import { StartupFormFieldValues } from "@/shared/types/form"
import { mapFormFieldsToAPI } from "./mappers"
import { ReplyAPI } from "@/shared/types/analysis"
import { axiosInstance } from "@/shared/api/axiosInstance"

export const getAnalysis = (formValues: StartupFormFieldValues) => {
  // return new Promise<ReplyAPI>((resolve) => {
  //   setTimeout(() => resolve({ data: { summarize: `${Object.entries(formValues).map(([k, v]) => ''+k+v).join('\n')}\ **312321**` }}), 1000)
  // })
  return axiosInstance.post<ReplyAPI>('/projects', mapFormFieldsToAPI(formValues))
}

export const transformTranscriptionToFormFields = (transcription: string) => {
  return axiosInstance.post<StartupFormFieldValues>('/projects/transcribe', { transcribe_text: transcription });
}