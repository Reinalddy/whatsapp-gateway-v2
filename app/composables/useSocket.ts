import { io, Socket } from 'socket.io-client'

export const useSocket = () => {
    const config = useRuntimeConfig()
    const socket = ref<Socket | null>(null)
    const isConnected = ref(false)

    // Get base URL without /api suffix
    const getSocketUrl = () => {
        const apiUrl = config.public.apiBaseUrl as string
        return apiUrl.replace('/api', '')
    }

    const connect = () => {
        if (socket.value?.connected) return

        socket.value = io(getSocketUrl(), {
            transports: ['websocket', 'polling']
        })

        socket.value.on('connect', () => {
            console.log('Socket connected:', socket.value?.id)
            isConnected.value = true
        })

        socket.value.on('disconnect', () => {
            console.log('Socket disconnected')
            isConnected.value = false
        })
    }

    const disconnect = () => {
        if (socket.value) {
            socket.value.disconnect()
            socket.value = null
            isConnected.value = false
        }
    }

    const joinSession = (sessionName: string) => {
        if (socket.value) {
            socket.value.emit('join-session', sessionName)
        }
    }

    const leaveSession = (sessionName: string) => {
        if (socket.value) {
            socket.value.emit('leave-session', sessionName)
        }
    }

    const onQR = (callback: (data: { sessionName: string; qr: string }) => void) => {
        if (socket.value) {
            socket.value.on('qr', callback)
        }
    }

    const onConnection = (callback: (data: { sessionName: string; status: string; phoneNumber?: string }) => void) => {
        if (socket.value) {
            socket.value.on('connection', callback)
        }
    }

    const offQR = () => {
        if (socket.value) {
            socket.value.off('qr')
        }
    }

    const offConnection = () => {
        if (socket.value) {
            socket.value.off('connection')
        }
    }

    // Cleanup on unmount
    onUnmounted(() => {
        disconnect()
    })

    return {
        socket,
        isConnected,
        connect,
        disconnect,
        joinSession,
        leaveSession,
        onQR,
        onConnection,
        offQR,
        offConnection
    }
}
