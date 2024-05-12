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
        v-if="content && content !== 'null'"
        max-width="none"
        trigger="touchstart mouseenter"
        :delay="[0, 400]"
        :placement="placement || 'top'"
        :append-to="() => body"
        role="tooltip"
        :offset="[0, 5]"
    >
        <slot />

        <template #content>
            <div class="rounded-md bg-slate-900/70 px-3 py-1 text-sm text-slate-50 shadow-lg">
                {{ content }}
            </div>
        </template>
    </Tippy>
    <slot v-else />
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
