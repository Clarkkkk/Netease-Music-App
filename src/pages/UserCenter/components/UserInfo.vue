<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileStore } from 'stores'
import { Image } from 'components'

const { profile } = storeToRefs(useProfileStore())
</script>

<template>
    <div
        class="flex h-40 flex-col items-start justify-center px-4 md:flex-row md:items-center md:justify-between"
    >
        <template v-if="profile">
            <div class="flex items-center">
                <Image
                    :src="profile.profile.avatarUrl"
                    class="h-16 w-16 rounded-full md:h-20 md:w-20"
                />
                <div class="ml-4">
                    <div>
                        <span class="text-lg font-bold md:text-xl">
                            {{ profile.profile.nickname }}
                        </span>
                        <span class="badge badge-primary badge-sm ml-2">
                            {{ `LV ${profile.level}` }}
                        </span>
                    </div>
                    <div
                        v-if="profile.profile.signature"
                        class="text-sm text-base-content md:mt-2"
                    >
                        {{ profile.profile.signature }}
                    </div>
                </div>
            </div>
            <div class="mt-4 w-full text-end md:mt-0 md:w-auto">
                <div class="text-xs md:text-sm">
                    注册于
                    <span class="font-bold text-secondary">
                        {{
                            new Date(profile.createTime).toLocaleDateString('zh-CN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                        }}
                    </span>
                    ，距今
                    <span class="font-bold text-secondary">
                        {{ profile.createDays }}
                    </span>
                    天
                </div>
                <div class="text-xs md:mt-2 md:text-sm">
                    已收听
                    <span class="font-bold text-secondary">
                        {{ profile.listenSongs }}
                    </span>
                    首歌
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss"></style>
