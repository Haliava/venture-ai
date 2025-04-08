import { create } from 'zustand'
import { User } from '../types/user'

type UserStoreState = {
  user: User,
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: { email: 'example@gmail.com', name: 'User' },
  setUser: (newUser: User) => set(() => ({ user: newUser })),
}))