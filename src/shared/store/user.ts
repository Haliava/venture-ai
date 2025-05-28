import { create } from 'zustand'
import { User } from '../types/user'
import defaultProfileImage from '@/shared/assets/icons/avatar.svg'
import { axiosInstance } from '../api/axiosInstance'

type UserStoreState = {
  user: User,
  setUser: (newUser: User) => void
}

type AuthStore = {
  token: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (newState: boolean) => void;
  setToken: (token: string) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: {
    email: 'example@gmail.com',
    name: 'User',
    surname: 'Userovich',
    phone: '+7999111333',
    avatar: defaultProfileImage,
  },
  setUser: (newUser: User) => set(() => ({ user: newUser })),
}))

export const useAuth = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') ?? '',
  setIsLoggedIn: (newLoginState: boolean) => set(() => ({ isLoggedIn: newLoginState })),
  setToken: (token: string) => set(() => {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return { token };
  })
}))