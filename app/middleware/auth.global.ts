export default defineNuxtRouteMiddleware(async (to) => {
    const {
        token,
        loadFromStorage,
        isTokenExpired,
        logout
    } = useAuth()

    loadFromStorage()

    // halaman publik
    // TAPI KALAU ADA TOKEN DAN BELUM EXPIRED, MAKA REDIRECT KE DASHBOARD
    if (['/login', '/register'].includes(to.path)) {
        if (token.value && !isTokenExpired()) {
            return navigateTo('/client/dashboard')
        }

        return
    }

    if (!token.value || isTokenExpired()) {
        logout()
    }
})
