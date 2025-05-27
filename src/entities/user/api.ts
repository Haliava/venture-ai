import { axiosInstance } from "@/shared/api/axiosInstance"
import { RegisterUserFields, UserData } from "@/shared/types/user"
import { AxiosResponse } from "axios";

export const registerUser = (params: RegisterUserFields) => {
  return axiosInstance.post('/auth/register', { params });
}

export const loginUser = (params: RegisterUserFields) => {
  return axiosInstance.post('/auth/login', { params });
}

export const getUserData = () => {
  return axiosInstance.get<AxiosResponse<UserData>>('/auth/me')
}

export const updateUserData = (params: RegisterUserFields) => {
  return axiosInstance.put<AxiosResponse<UserData>>('/user/me', { params });
}

export const deleteUser = () => {
  return axiosInstance.delete('/auth/me')
}
