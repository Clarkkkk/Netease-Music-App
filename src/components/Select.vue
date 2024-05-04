<script setup lang="ts">
import { Select } from '@ark-ui/vue'
import { ContextMenu, ContextMenuItem } from './ContextMenu'

defineProps<{
    label?: string
    options: {
        label: string
        value: string
    }[]
    placeholder?: string
}>()

const value = defineModel<string>()
</script>

<template>
    <Select.Root
        :model-value="value ? [value] : undefined"
        :items="options"
        class="flex items-center justify-between"
        @update:model-value="(val) => (value = val[0])"
    >
        <Select.Label
            v-if="label"
            class="label"
        >
            {{ label }}
        </Select.Label>
        <ContextMenu>
            <Select.Control>
                <Select.Trigger class="select select-bordered select-sm min-w-32">
                    <Select.ValueText :placeholder="placeholder" />
                </Select.Trigger>
            </Select.Control>

            <template #menu>
                <Select.Item
                    v-for="item in options"
                    :key="item.value"
                    :item="item"
                >
                    <ContextMenuItem
                        :class="{ 'bg-primary/10': item.value === value }"
                        :active="item.value === value"
                    >
                        <Select.ItemText>{{ item.label }}</Select.ItemText>
                    </ContextMenuItem>
                </Select.Item>
            </template>
        </ContextMenu>
        <Select.HiddenSelect />
    </Select.Root>
</template>

<style lang="scss"></style>
