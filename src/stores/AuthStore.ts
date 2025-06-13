import { create } from "zustand";
import User from "../types/user";
import { jwtDecode } from "jwt-decode";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  verifyToken: () => Promise<void>;
  // Nuevos métodos para manejar los apellidos
  getFullName: () => string;
  getUserInitials: () => string;
};

const useAuthStore = create<AuthState>()((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,

  login: (token: string) => {
    try {
      localStorage.setItem("auth-token", token);
      const user = jwtDecode<User>(token);
      if (!user) {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: "Invalid token",
        });
        return;
      }
      set({ isAuthenticated: true, user, isLoading: false, error: null });
    } catch (error) {
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: "Invalid token",
      });
    }
  },

  logout: () => {
    localStorage.removeItem("auth-token");
    set({ isAuthenticated: false, user: null, isLoading: false, error: null });
  },

  updateUser: (userData: Partial<User>) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            ...userData,
            // Asegurar que updated_at se actualice
            updated_at: new Date().toISOString(),
          }
        : null,
    })),

  verifyToken: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem("auth-token");

    if (!token) {
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    try {
      const decodedToken = jwtDecode<User>(token);
      if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        throw new Error("Token expired");
      }
      set({
        isAuthenticated: true,
        user: decodedToken,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      localStorage.removeItem("auth-token");
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },

  // Método para obtener el nombre completo del usuario
  getFullName: () => {
    const { user } = get();
    if (!user) return "";

    // Devuelve: "Nombres Primer_Apellido Segundo_Apellido"
    return `${user.name} ${user.first_lastname} ${user.second_lastname}`.trim();
  },

  // Método para obtener las iniciales del usuario
  getUserInitials: () => {
    const { user } = get();
    if (!user) return "";

    const nameParts = user.name.split(" ");
    const firstNameInitial = nameParts[0]?.charAt(0) || "";
    const firstLastnameInitial = user.first_lastname?.charAt(0) || "";

    return `${firstNameInitial}${firstLastnameInitial}`.toUpperCase();
  },
}));

export default useAuthStore;
