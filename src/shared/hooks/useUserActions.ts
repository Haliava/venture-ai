import { getUserData, registerUser as registerUserAPI, loginUser as loginUserAPI, updateUserData } from "@/entities/user/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../store/user"
import { queryClient } from "@/app/App";

export const useUserActions = () => {
  const { setIsLoggedIn } = useAuth();

  const { mutateAsync: loginUser, isPending: isLoggingIn } = useMutation({
    mutationKey: ['user', 'login'],
    mutationFn: loginUserAPI,
    onSuccess: data => {
      setIsLoggedIn(true);
      return data.data;
    }
  })

    const { mutateAsync: registerUser, isPending: isRegistring } = useMutation({
    mutationKey: ['user', 'register'],
    mutationFn: registerUserAPI,
    onSuccess: data => {
      setIsLoggedIn(true);
      return data.data;
    }
  })

  const { mutateAsync:  updateUser, isPending: isUserUpdating } = useMutation({
    mutationKey: ['user', 'update'],
    mutationFn: updateUserData,
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['user']})
      return data.data.data
    }
  })

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    select: data => data.data.data,
  })

  return {
    loginUser,
    isLoggingIn,
    registerUser,
    isRegistring,
    updateUser,
    isUserUpdating,
    userData,
    isLoadingUser,
  }
}