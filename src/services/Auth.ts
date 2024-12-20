import axios from "axios";
import { RegisterUser } from "@/types/user";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string

const headers = {
    'Content-Type': 'application/json',
}

// Login with email and password
export const LocalLogin = async (email: string, password: string) => (
    axios.post(`${apiBaseUrl}/auth/login/local`, {
        email,
        password
    }, { headers })
)

// Register a new user
export const Register = async (user: RegisterUser) => (
    axios.post(`${apiBaseUrl}/user/new`, user, { headers })
)
