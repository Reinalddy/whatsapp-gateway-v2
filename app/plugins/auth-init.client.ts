export default defineNuxtPlugin(async () => {
    const { token, fetchMe, isTokenExpired, logout, loadFromStorage } = useAuth()

    loadFromStorage()

    if (token.value) {
        if (isTokenExpired()) {
            logout()
        } else {
            await fetchMe()
        }
    }
})