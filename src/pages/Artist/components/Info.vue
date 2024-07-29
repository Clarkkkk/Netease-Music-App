<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Collapsible, Image } from 'components'
import { toHttps } from 'utils'

interface InfoProps {
    picUrl: string
    name: string
    description: string
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
            :src="toHttps(picUrl)"
        />
        <Image
            ref="modal"
            :src="toHttps(picUrl)"
            class="songlist-cover h-56 w-56 flex-fixed rounded-xl"
            object-fit="cover"
        />
        <div class="relative md:ml-6">
            <h1
                class="mt-4 text-center text-lg font-bold text-base-content md:mt-0 md:text-start md:text-2xl"
            >
                {{ name }}
            </h1>
            <Collapsible
                :collapsible="
                    // prettier-ignore
                    (description?.length || 0) >
                        (lessThan768 ? 150 : lessThan1280 ? 300 : 400)
                "
                :collapse-height="lessThan768 ? 97 : 110"
                :possible-max-height="lessThan1280 ? 500 : 1000"
            >
                <div class="mt-4 text-xs text-base-content/80 md:mt-8 md:text-sm">
                    {{ description }}
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
