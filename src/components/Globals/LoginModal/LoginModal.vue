<script setup lang="ts">
import { computed, watch } from 'vue'
import {
    Dialog,
    DialogCloseTrigger,
    DialogContainer,
    DialogContent,
    DialogTitle
} from '@ark-ui/vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'stores'
import { Image } from 'components'
import Loading from '../../Loading.vue'
import { useQrcodeLogin } from './services'

const { showLoginModal } = storeToRefs(useAuthStore())
const { qrcodeImg, qrcodeLoginStatus, generateQrcode, resetQrcodeStatus } = useQrcodeLogin()

const message = computed(() => {
    if (qrcodeLoginStatus.value === 'wait-scan') {
        return '请使用网易云音乐app扫描二维码'
    } else if (qrcodeLoginStatus.value === 'wait-confirm') {
        return '请在app中确认登录'
    } else {
        return ''
    }
})

function refresh() {
    resetQrcodeStatus()
    generateQrcode()
}

watch(showLoginModal, (val) => {
    if (val === true) {
        generateQrcode()
    } else {
        resetQrcodeStatus()
    }
})

watch(qrcodeLoginStatus, (val) => {
    if (val === 'logged-in') {
        window.setTimeout(() => {
            window.location.reload()
        }, 800)
    }
})
</script>

<template>
    <Dialog
        v-model:open="showLoginModal"
        :close-on-outside-click="false"
    >
        <Teleport to="body">
            <DialogContainer
                :class="['modal', 'backdrop-blur-xl', { 'modal-open': showLoginModal }]"
            >
                <DialogContent class="modal-box flex flex-col items-center">
                    <DialogTitle class="text-xl font-bold"> 扫码登录 </DialogTitle>
                    <div
                        class="relative m-5 h-40 w-40 overflow-hidden rounded-2xl border-4 border-primary/10"
                    >
                        <Loading
                            v-if="qrcodeLoginStatus === 'initial' && !qrcodeImg"
                            class="h-full w-full"
                        />
                        <Image
                            v-else
                            :src="qrcodeImg"
                            class="h-full w-full overflow-hidden rounded-2xl"
                        />
                        <div
                            v-if="qrcodeLoginStatus === 'expired'"
                            class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-base-300"
                        >
                            <button
                                class="btn btn-sm"
                                @click="refresh"
                            >
                                点击刷新
                            </button>
                        </div>
                        <div
                            v-if="qrcodeLoginStatus === 'logged-in'"
                            class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-base-300"
                        >
                            <div class="flex items-center">
                                <i-solar-unread-linear
                                    class="mr-2 h-5 w-5 rounded-full bg-success text-neutral-50"
                                />
                                <span>登录成功</span>
                            </div>
                        </div>
                    </div>
                    <div class="h-5 text-sm text-info-content">
                        {{ message }}
                    </div>
                    <DialogCloseTrigger class="absolute right-1 top-1">
                        <button class="btn btn-square btn-ghost">
                            <i-fluent-dismiss-32-regular />
                        </button>
                    </DialogCloseTrigger>
                </DialogContent>
            </DialogContainer>
        </Teleport>
    </Dialog>
</template>

<style lang="scss">
.modal.modal-open {
    z-index: 3000;
}
</style>
