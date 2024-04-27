<script setup lang="ts">
import Button from '../Button.vue'
import { useDrawerContext } from './context'

const { open } = useDrawerContext()
</script>

<template>
    <Button @click="open">
        <slot />
    </Button>
</template>

<style lang="scss"></style>
