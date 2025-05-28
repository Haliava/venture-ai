import { axiosInstance } from "@/shared/api/axiosInstance"
import { Feedback } from "@/shared/types/feedback"

export const sendFeedback = (feedback: Feedback) => {
  return axiosInstance.post('/feedback', feedback)
}