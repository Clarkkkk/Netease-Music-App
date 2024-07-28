<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { ApiPlaylistDetail } from 'api'
import { Collapsible, Image } from 'components'
import { toHttps } from 'utils'

interface InfoProps {
    info: ApiPlaylistDetail['return']['playlist'] | null
}

defineProps<InfoProps>()

const modal = ref<InstanceType<typeof Image> | null>(null)
const lessThan768 = useMediaQuery('(max-width: 767px)')
const lessThan1280 = useMediaQuery('(max-width: 1279px)')
</script>

<template>
    <div class="flex flex-col items-center md:flex-row md:items-start">
        <Image
            id="info-background"
            class="pointer-events-none"
            :src="info?.coverImgUrl ? toHttps(info.coverImgUrl) : ''"
        />
        <Image
            ref="modal"
            :src="info?.coverImgUrl ? toHttps(info.coverImgUrl) : ''"
            class="songlist-cover h-56 w-56 flex-fixed rounded-xl"
        />
        <div class="relative md:ml-6">
            <h1
                class="mt-4 text-center text-lg font-bold text-base-content md:mt-0 md:text-start md:text-2xl"
            >
                {{ info?.name }}
            </h1>
            <div class="mt-2 flex items-center justify-center md:justify-start">
                <span
                    v-for="(tag, index) in info?.tags || []"
                    :key="tag"
                    :class="[
                        'badge',
                        lessThan768 ? 'badge-xs' : 'badge-sm',
                        'mr-2',
                        { 'badge-secondary': index % 3 === 0 },
                        { 'badge-primary': index % 3 === 1 },
                        { 'badge-accent': index % 3 === 2 }
                    ]"
                >
                    {{ tag }}
                </span>
                <div
                    v-if="info"
                    class="badge badge-ghost badge-sm"
                >
                    {{ '已有' }}
                    <span class="mx-1 font-bold text-primary">
                        {{ info.subscribedCount }}
                    </span>
                    {{ '人听过' }}
                </div>
            </div>
            <div class="mt-4 flex items-center justify-center md:justify-start">
                <Image
                    v-if="info?.creator.avatarUrl"
                    :src="toHttps(info?.creator.avatarUrl)"
                    class="mr-2 h-6 w-6 rounded-full"
                    :size="48"
                />
                <i-solar-user-bold-duotone
                    v-else
                    class="mr-2 h-6 w-6 text-primary"
                />
                <span class="text-sm text-base-content md:text-base">
                    {{ info?.creator.nickname }}
                </span>
            </div>
            <Collapsible
                :collapsible="
                    // prettier-ignore
                    (info?.description?.length || 0) >
                        (lessThan768 ? 150 : lessThan1280 ? 300 : 400)
                "
                :collapse-height="lessThan768 ? 97 : 110"
                :possible-max-height="lessThan1280 ? 500 : 1000"
            >
                <div class="mt-4 text-xs text-base-content/80 md:mt-8 md:text-sm">
                    {{ info?.description }}
                </div>
            </Collapsible>
        </div>
    </div>
</template>

<style lang="scss">
#info-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.4), transparent 100%);
    filter: blur(30px) saturate(150%) brightness(1.3);
    transform: scale(1.1);
    width: 100%;
    height: 400px;

    img {
        object-fit: cover;
    }
}
</style>
