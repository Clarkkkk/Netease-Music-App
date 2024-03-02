<template>
  <div id="app-search-bar">
    <slot name="left" />
    <form
      class="input-area"
      action=""
    >
      <input
        ref="input"
        type="search"
        class="input"
        v-bind="$attrs"
        :value="value"
        v-on="inputListeners"
      >
      <app-icon
        icon="search"
        class="icon"
      />
    </form>
    <slot name="right" />
  </div>
</template>

<script>
export default {
  name: 'AppSearchBar',
  inheritAttrs: false,
  props: ['value', 'focus'],
  computed: {
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit('input', event.target.value);
        }
      });
    }
  },

  watch: {
    focus(val) {
      this.focusIf(val);
    }
  },

  mounted() {
    this.focusIf(this.focus);
  },

  methods: {
    focusIf(condition) {
      if (condition) {
        this.$nextTick().then(() => {
          this.$refs.input.focus();
        });
      }
    }
  }
};
</script>

<style scoped>
#app-search-bar {
  width: 100%;
  height: 3rem;
  background-color: var(--app-color);
  padding-top: env(safe-area-inset-top);
  color: white;
}

.input-area {
  grid-column: search-start / search-end;
  height: 2rem;
  width: 100%;
  margin: 0 0.5rem;
  border-radius: 2rem;
  background-color: #00000030;
  display: grid;
  grid-template-columns:
    [start input-start] 1fr [input-end icon-start] 3rem [icon-end end];
  align-items: center;
  justify-items: center;
}

.input {
  grid-column: input-start / input-end;
  margin: 0;
  border: none;
  padding: 0 1.2rem;
  background-color: transparent;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: white;
}

.input[cursor="pointer"] {
  cursor: pointer;
}

.input:focus, .input:active {
  border: none;
  outline: none;
}

.icon {
  grid-column: icon-start / icon-end;
  color: #ffffff80;
}
</style>
