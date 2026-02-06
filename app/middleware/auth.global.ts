export default defineNuxtRouteMiddleware(async (to) => {
    const {
        token,
        loadFromStorage,
        isTokenExpired,
    } = useAuth()

    // Load token from localStorage on client-side
    loadFromStorage()

    // Public pages - no auth required
    const publicPages = ['/login', '/register']

    if (publicPages.includes(to.path)) {
        // If already logged in with valid token, redirect to dashboard
        if (token.value && !isTokenExpired()) {
            return navigateTo('/client/dashboard')
        }
        return
    }

    // Protected routes - check authentication
    if (to.path.startsWith('/client') || to.path.startsWith('/admin') || to.path.startsWith('/dashboard')) {
        // No token or expired token - redirect to login
        if (!token.value || isTokenExpired()) {
            // Clear any invalid token
            if (import.meta.client) {
                localStorage.removeItem('token')
            }
            return navigateTo('/login')
        }
    }
})
