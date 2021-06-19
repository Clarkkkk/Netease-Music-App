<template>
  <div id="pop-menu" @click="closeMenu" @tap="closeMenu">
    <div v-for="menuItem in menuArr" :key="menuItem.name">
      <div class="menu-item">
        {{menuItem.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastClick: Date.now()
    }
  },
  props: ['menuArr', 'show'],
  methods: {
    closeMenu(event) {
      console.log('close')
      event.stopPropagation()
      if (Date.now() - this.lastClick < 100) return
      this.lastClick = Date.now();
      this.$emit('update:show', false)
    }
  }
}

</script>

<style scoped>
#pop-menu {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #00000060;
  backdrop-filter: blur(10px);
}
</style>
