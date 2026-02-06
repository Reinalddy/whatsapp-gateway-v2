import { jwtDecode } from 'jwt-decode'

type LoginResponse = {
    code: number,
    message: string,
    data: {
        token: string,
        user: {
            id: number,
            name: string,
            email: string,
            phoneNumber: number
        }

    }
}

type RegisterResponse = {
    code: number,
    message: string,
    data: {
        token: string,
        user: {
            id: number,
            name: string,
            email: string,
            phoneNumber: number
        }

    }
}

type MeResponse = {
    code: number,
    message: string,
    data: {
        id: number,
        name: string,
        email: string,
        phoneNumber: number
    }
}

interface JwtPayload {
    exp: number
}

export const useAuth = () => {
    const config = useRuntimeConfig()

    const token = useState<string | null>('auth-token', () => null)
    const user = useState<any>('auth-user', () => null)
    const isAuthenticated = computed(() => !!token.value)

    const login = async (email: string, password: string) => {
        const res: LoginResponse = await $fetch(`${config.public.apiBaseUrl}/auth/login`, {
            method: 'POST',
            body: { email, password }
        })

        token.value = res.data.token
        user.value = res.data.user

        localStorage.setItem('token', res.data.token)
    }

    const register = async (name: string, email: string, password: string, phoneNumber: number) => {
        const res: RegisterResponse = await $fetch(`${config.public.apiBaseUrl}/api/auth/register`, {
            method: 'POST',
            body: { name, email, password }
        })

        token.value = res.data.token
        user.value = res.data.user

        localStorage.setItem('token', res.data.token)
    }

    // 🔹 Ambil token dari localStorage
    const loadFromStorage = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('token')
            if (saved) token.value = saved
        }
    }

    // 🔹 Logout bersih
    const logout = () => {
        token.value = null
        user.value = null
        if (import.meta.client) {
            localStorage.removeItem('token')
        }
        navigateTo('/login')
    }

    // 🔹 Refresh user state (opsional tapi recommended)
    const fetchMe = async () => {
        if (!token.value) return
        try {
            const res = await $fetch<MeResponse>(`${config.public.apiBaseUrl}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
            user.value = res.data
        } catch {
            logout()
        }
    }
    const isTokenExpired = () => {
        if (!token.value) return true

        try {
            const decoded = jwtDecode<JwtPayload>(token.value)
            return decoded.exp * 1000 < Date.now()
        } catch {
            return true
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        loadFromStorage,
        isTokenExpired,
        logout,
        fetchMe,
        login,
        register
    }
}