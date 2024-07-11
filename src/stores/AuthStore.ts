import { create } from 'zustand'
import { User } from '../types/user'

type Store = {
  user: User | null
  setUser: (user: User) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useAuthStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated })
}))

export default useAuthStore;