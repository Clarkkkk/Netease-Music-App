<template>
  <svg class="app-icon">
    <use v-bind:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    icon: {
      required: true,
      type: String
    }
  }
};
</script>

<style>
.app-icon {
  height: 1em;
  width: 1em;
  fill: currentColor !important;
  -webkit-tap-highlight-color: transparent;
  transition: all 300ms;
}

.app-icon:hover {
  filter: drop-shadow( 0 0 2px #bbb);
  transform: scale(1.1);
}

.app-icon:active {
  filter: drop-shadow( 0 0 2px #bbb);
  transform: scale(1);
}
</style>
