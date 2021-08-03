<template>
  <teleport to="#app">
    <transition name="blur">
      <div
        v-if="show"
        id="pop-menu"
        @click="closeMenu"
      >
        <div class="menu-container">
          <div
            v-for="menuItem in menuArr"
            :key="menuItem.name"
            class="menu-item"
          >
            <div class="menu-text">
              {{ menuItem.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ['menuArr', 'show'],
  emits: ['update:show'],
  setup(props, {emit}) {
    const closeMenu = (event) => {
      event.stopPropagation();
      emit('update:show', false);
    };
    return {
      closeMenu
    };
  }
};

</script>

<style scoped>
#pop-menu {
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  grid-template-columns: [start] 100% [end];
  grid-template-rows: [start] 100% [end];
  align-items: end;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background-color: #00000060;
  backdrop-filter: blur(10px);
}

.menu-container {
  display: grid;
  bottom: 0;
  box-sizing: border-box;
  grid-column: start/ end;
  grid-row: start / end;
  grid-template-columns: [start] 100% [end];
  grid-template-rows:
    [start title-start] minmax(3rem, min-content) [title-end]
    repeat(auto-fit, 3rem) [end];
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  background-color: #fff;
}

.menu-item {
  display: grid;
  grid-column: start / end;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid #88888830;
}

.menu-item:last-child {
  border-bottom: none;
}

/* transition */
.blur-enter-active,
.blur-leave-active {
  transition: opacity 300ms;
  opacity: 1;
}

.blur-enter-from,
.blur-leave-to {
  opacity: 0;
}

.blur-enter-from > .menu-container,
.blur-leave-to > .menu-container {
  transform: translateY(25rem) translateZ(0);
}

.blur-enter-active > .menu-container {
  transition: transform 300ms ease;
}

.blur-leave-active > .menu-container {
  transition: transform 300ms ease;
}
/* transition */
</style>
