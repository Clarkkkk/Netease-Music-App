<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue'
import { mergeClass } from 'utils'

defineProps<{
    label: string
    disabled?: boolean
    inputClass?: string
}>()

const checked = defineModel<boolean>()
</script>

<template>
    <Checkbox.Root
        v-model:checked="checked"
        class="flex items-center justify-between"
    >
        <Checkbox.Label class="label">{{ label }}</Checkbox.Label>
        <Checkbox.HiddenInput
            :checked="checked"
            :class="mergeClass('toggle toggle-sm', inputClass)"
            :style="{
                border: undefined,
                clip: undefined,
                padding: undefined,
                margin: undefined,
                position: undefined,
                overflow: undefined,
                width: undefined,
                height: undefined
            }"
        />
    </Checkbox.Root>
</template>

<style lang="scss"></style>
