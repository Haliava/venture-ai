import { create } from 'zustand'
import { User } from '../types/user'
import defaultProfileImage from '@/shared/assets/icons/avatar.svg'

type UserStoreState = {
  user: User,
}

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (newState: boolean) => void;
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
  isLoggedIn: false,
  setIsLoggedIn: (newLoginState: boolean) => set(() => ({ isLoggedIn: newLoginState })),
}))