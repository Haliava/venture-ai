import { PropsWithChildren, useEffect, useState } from 'react'
import { axiosInstance } from './axiosInstance';
import { useAuth } from '../store/user';

export const AxiosInterceptor = ({ children }: PropsWithChildren) => {
  const { setIsLoggedIn, setToken } = useAuth();
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const resInterceptor = (response: any) => response;

    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        setIsLoggedIn(false)
        setToken('');
      }

      return Promise.reject(error);
    }


    const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);
    setIsSet(true)
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [])

  return isSet && children
}
