export interface SendMessagePayload {
    deviceId: number
    to: string
    type: 'text' | 'image' | 'document'
    message?: string
    mediaBase64?: string
    filename?: string
    caption?: string
    mimetype?: string
}

export interface MessageResult {
    messageId: string
}

export interface ApiResponse<T> {
    code: number
    message: string
    data: T
}

export const useMessages = () => {
    const config = useRuntimeConfig()
    const { token } = useAuth()

    const loading = ref(false)
    const error = ref<string | null>(null)

    const getAuthHeaders = () => ({
        Authorization: `Bearer ${token.value}`
    })

    // Send message
    const sendMessage = async (payload: SendMessagePayload) => {
        loading.value = true
        error.value = null
        try {
            const res = await $fetch<ApiResponse<MessageResult>>(
                `${config.public.apiBaseUrl}/messages/send-message`,
                {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: payload
                }
            )
            return res.data
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to send message'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Check if device can send messages
    const checkDevice = async (deviceId: number) => {
        try {
            const res = await $fetch<ApiResponse<{ canSend: boolean; reason: string | null }>>(
                `${config.public.apiBaseUrl}/messages/check/${deviceId}`,
                { headers: getAuthHeaders() }
            )
            return res.data
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to check device'
            throw err
        }
    }

    // Helper to convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const result = reader.result as string
                // Remove data URL prefix (e.g., "data:image/png;base64,")
                const base64 = result.split(',')[1]
                resolve(base64)
            }
            reader.onerror = reject
        })
    }

    return {
        loading,
        error,
        sendMessage,
        checkDevice,
        fileToBase64
    }
}
