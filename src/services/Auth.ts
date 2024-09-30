import axios from "axios";

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