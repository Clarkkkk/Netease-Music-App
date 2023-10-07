import { ref } from 'vue'
import type { ApiLoginQrCheck, ApiLoginQrCreate, ApiLoginQrKey } from 'api'
import { ONE_DAY } from 'common'
import { useAuthStore } from 'stores'
import { post } from 'utils'
import { getCookieExpires } from './getCookieExpires'
import { parseCookie } from './parseCookie'

export function useQrcodeLogin() {
    const qrcodeKey = ref('')
    const qrcodeImg = ref('')
    const intervalId = ref(0)
    const qrcodeLoginStatus = ref<
        'initial' | 'wait-scan' | 'wait-confirm' | 'expired' | 'logged-in'
    >('initial')
    const { storeLoginInfo } = useAuthStore()

    /** 生成二维码，并启动轮询 */
    function generateQrcode() {
        post<ApiLoginQrKey>('/login/qr/key')
            .then(({ data }) => {
                qrcodeKey.value = data.unikey
                return post<ApiLoginQrCreate>('/login/qr/create', {
                    key: qrcodeKey.value,
                    qrimg: true
                })
            })
            .then(({ data }) => {
                qrcodeImg.value = data.qrimg
                qrcodeLoginStatus.value = 'wait-scan'
                checkStatus()
            })
            .catch(() => {
                qrcodeLoginStatus.value = 'expired'
                clearInterval(intervalId.value)
            })
    }

    /** 轮询登录状态 */
    function checkStatus() {
        intervalId.value = window.setInterval(() => {
            post<ApiLoginQrCheck>('/login/qr/check', {
                key: qrcodeKey.value
            }).then(({ code, cookie }) => {
                if (code === 801) {
                    qrcodeLoginStatus.value = 'wait-scan'
                } else if (code === 802) {
                    qrcodeLoginStatus.value = 'wait-confirm'
                } else if (code === 803) {
                    qrcodeLoginStatus.value = 'logged-in'
                    clearInterval(intervalId.value)
                    const cookies = parseCookie(cookie || '')
                    const expires = getCookieExpires(cookies)
                    console.log(cookies)
                    console.log(cookie)
                    console.log(expires)
                    storeLoginInfo({ expires: Math.max(expires, Date.now() + 7 * ONE_DAY) })
                } else if (qrcodeLoginStatus.value !== 'logged-in') {
                    qrcodeLoginStatus.value = 'expired'
                    clearInterval(intervalId.value)
                }
            })
        }, 1500)
    }

    function resetInterval() {
        clearInterval(intervalId.value)
        intervalId.value = 0
    }

    function reset() {
        resetInterval()
        qrcodeLoginStatus.value = 'initial'
        qrcodeImg.value = ''
        qrcodeKey.value = ''
    }

    return {
        qrcodeLoginStatus,
        generateQrcode,
        qrcodeImg,
        resetQrcodeStatus: reset
    }
}
