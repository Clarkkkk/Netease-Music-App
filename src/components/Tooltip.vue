<script setup lang="ts">
import { Tippy } from 'vue-tippy'
import type { Placement } from 'tippy.js'

interface ContextMenuProps {
    content: string | undefined
    /** tooltip弹出位置 */
    placement?: Placement
}

defineProps<ContextMenuProps>()

const body = document.body
</script>

<template>
    <Tippy
        v-if="content"
        max-width="none"
        trigger="touchstart mouseenter"
        :delay="[0, 100]"
        :placement="placement || 'top'"
        :append-to="() => body"
        role="tooltip"
        :offset="[0, 5]"
    >
        <slot></slot>

        <template #content>
            <div class="rounded-md bg-slate-900/70 px-3 py-1 text-sm text-base-200 shadow-lg">
                {{ content }}
            </div>
        </template>
    </Tippy>
    <slot v-else></slot>
</template>

<style lang="scss">
.tippy-box[role='tooltip'] {
    transition: all 300ms;
}
.tippy-box[data-state='hidden'][role='tooltip'] {
    transform: scaleY(0.95);
    transform-origin: center;
    opacity: 0;
}
</style>
