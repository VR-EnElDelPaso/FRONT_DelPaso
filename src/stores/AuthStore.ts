import { create } from 'zustand'
import User from '../types/user'
import { jwtDecode } from 'jwt-decode';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  verifyToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,
  fullProfile: null,
  isLoading: false,
  error: null,

  login: (token: string) => {
    localStorage.setItem('auth-token', token);
    const user = jwtDecode<User>(token);
    if (!user) {
      set({ isAuthenticated: false, user: null, isLoading: false, error: 'Invalid token' });
      return;
    }
    set({ isAuthenticated: true, user, isLoading: false, error: null });
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({ isAuthenticated: false, user: null, isLoading: false, error: null });
  },

  updateUser: (userData: Partial<User>) =>
    set((state) => ({ user: state.user ? { ...state.user, ...userData } : null })),

  verifyToken: async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      set({ isAuthenticated: false, user: null, isLoading: false, error: null });
      return;
    }
    try {
      const decodedToken = jwtDecode<User>(token);
      if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        throw new Error('Token expired');
      }
      set({ isAuthenticated: true, user: decodedToken, isLoading: false, error: null });
    } catch (error) {
      localStorage.removeItem('auth-token');
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },
}))

export default useAuthStore;