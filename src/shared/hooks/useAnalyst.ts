import { getAnalysis } from "@/entities/analyst/api"
import { useMutation } from "@tanstack/react-query"
import { StartupFormFieldValues } from "../types/form"

export const useAnalyst = () => {
  const { mutateAsync: askAnalyst, data: analystReply, isPending: isAnswerLoading } = useMutation({
    mutationKey: ['analyst', 'ask'],
    mutationFn: (formValues: StartupFormFieldValues) => getAnalysis(formValues),
  })

  return {
    analystReply,
    askAnalyst,
    isAnswerLoading,
  }
}