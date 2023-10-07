import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { post } from 'utils'
import type { ApiLogout } from '../api/ApiLogout'

export const useAuthStore = defineStore('auth', () => {
    const loggedIn = ref(false)
    const userId = ref(0)
    const showLoginModal = ref(false)
    /** 保存登录cookie的过期时间，cookie未过期则不需要请求接口校验登录状态 */
    const loginStorage = useStorage<{ userId: number; expires: number }>('music-login-info', {
        userId: 0,
        expires: 0
    })

    console.log(loginStorage.value.expires)

    function resetStoredLoginInfo() {
        loginStorage.value.userId = 0
        loginStorage.value.expires = 0
    }

    function storeLoginInfo(data: { userId?: number; expires?: number }) {
        console.log('store')
        if (data.expires) {
            loginStorage.value.expires = data.expires
        }

        if (data.userId) {
            loginStorage.value.userId = data.userId
        }
    }

    function login(id: number) {
        loggedIn.value = true
        userId.value = id
    }

    async function logout() {
        // if (loginStorage.value.userId) {
        //     await post<ApiLogout>('/logout')
        // }
        // loggedIn.value = false
        // userId.value = 0
        // resetStoredLoginInfo()
    }

    function openLogin() {
        showLoginModal.value = true
    }

    function closeLogin() {
        showLoginModal.value = false
    }

    return {
        loggedIn,
        loginInfo: loginStorage,
        login,
        logout,
        showLoginModal,
        openLogin,
        closeLogin,
        resetStoredLoginInfo,
        storeLoginInfo
    }
})
