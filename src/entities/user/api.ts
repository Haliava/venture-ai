import { axiosInstance } from "@/shared/api/axiosInstance"
import { RegisterUserFields, UserData } from "@/shared/types/user"

export const verifyRegistration = (params: {token: string}) => {
  return axiosInstance.get(`/verify-email?token=${params.token}`)
}

export const registerUser = (params: RegisterUserFields) => {
  return axiosInstance.post('/auth/register', params);
}

export const loginUser = (params: RegisterUserFields) => {
  console.log(params);
  return axiosInstance.post('/auth/login', params);
}

export const getUserData = () => {
  return axiosInstance.get<UserData>('/users/me')
}

export const updateUserData = (params: RegisterUserFields) => {
  return axiosInstance.put<UserData>('/users/me', { params });
}

export const deleteUser = () => {
  return axiosInstance.delete('/auth/me')
}
