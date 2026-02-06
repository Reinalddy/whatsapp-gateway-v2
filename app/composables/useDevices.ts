export interface Device {
    id: number
    userId: number
    sessionName: string
    phoneNumber: string | null
    status: 'pending' | 'connected' | 'disconnected'
    liveStatus: 'pending' | 'connected' | 'not_found'
    isOnline: boolean
    hasQR?: boolean
    createdAt: string
    updatedAt: string
}

export interface DeviceQRResponse {
    sessionName: string
    isConnected: boolean
    qr: string | null
    qrImage: string | null
}

export interface ApiResponse<T> {
    code: number
    message: string
    data: T
}

export const useDevices = () => {
    const config = useRuntimeConfig()
    const { token } = useAuth()

    const devices = ref<Device[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const getAuthHeaders = () => ({
        Authorization: `Bearer ${token.value}`
    })

    // Fetch all devices
    const fetchDevices = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await $fetch<ApiResponse<Device[]>>(`${config.public.apiBaseUrl}/devices`, {
                headers: getAuthHeaders()
            })
            devices.value = res.data
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to fetch devices'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Create new device
    const createDevice = async (sessionName: string) => {
        loading.value = true
        error.value = null
        try {
            const res = await $fetch<ApiResponse<Device>>(`${config.public.apiBaseUrl}/devices`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: { sessionName }
            })
            await fetchDevices()
            return res.data
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to create device'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Get device QR code
    const getDeviceQR = async (deviceId: number, format: 'image' | 'raw' = 'image') => {
        try {
            const res = await $fetch<ApiResponse<DeviceQRResponse>>(
                `${config.public.apiBaseUrl}/devices/${deviceId}/qr?format=${format}`,
                { headers: getAuthHeaders() }
            )
            return res.data
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to get QR code'
            throw err
        }
    }

    // Delete device
    const deleteDevice = async (deviceId: number) => {
        loading.value = true
        error.value = null
        try {
            await $fetch(`${config.public.apiBaseUrl}/devices/${deviceId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            })
            await fetchDevices()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to delete device'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Reconnect device
    const reconnectDevice = async (deviceId: number) => {
        loading.value = true
        error.value = null
        try {
            await $fetch(`${config.public.apiBaseUrl}/devices/${deviceId}/reconnect`, {
                method: 'POST',
                headers: getAuthHeaders()
            })
            await fetchDevices()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to reconnect device'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        devices,
        loading,
        error,
        fetchDevices,
        createDevice,
        getDeviceQR,
        deleteDevice,
        reconnectDevice
    }
}
