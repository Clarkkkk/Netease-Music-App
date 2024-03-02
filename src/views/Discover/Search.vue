<template>
  <div id="search">
    <app-search-bar
      v-model="searchText"
      class="header"
      :focus="!isResult"
      @focus="onFocus"
      @keydown.enter="search"
    >
      <template
        v-if="isResult"
        #left
      >
        <app-back-button />
      </template>
      <template
        v-if="!isResult"
        #right
      >
        <input
          type="button"
          class="cancel"
          value="取消"
          @click="searchCancel"
        >
      </template>
    </app-search-bar>
    <keep-alive include="discover-search-default">
      <router-view :search-text.sync="searchText" />
    </keep-alive>
  </div>
</template>

<script>
import AppSearchBar from '@/components/AppSearchBar.vue';
import AppBackButton from '@/components/AppBackButton.vue';
export default {
  name: 'Search',

  components: {
    AppSearchBar,
    AppBackButton
  },
  data: function() {
    return {
      loading: false,
      searchText: ''
    };
  },

  computed: {
    isResult() {
      return this.$route.name === 'discover-search-result';
    }
  },

  watch: {
    searchText() {
      console.log('searchText changed');
    }
  },

  methods: {
    onFocus() {
      if (this.isResult) {
        this.$router.push({
          name: 'discover-search',
        });
      }
    },

    searchCancel() {
      this.$router.push({
        name: 'discover',
        params: {
          back: true
        }
      });
    },

    search(event) {
      event.target.blur();
      this.$router.push('/search/result/' + this.searchText);
    }
  }
};
</script>

<style scoped>
#search {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows:
    [start header-start] min-content [header-end content-start]
    1fr [content-end];
}

.header {
  grid-row: header;
  display: grid;
  grid-template-columns:
    [start back-start] min-content [back-end search-start] 1fr
    [search-end right-start] min-content[right-end end];
  grid-template-rows: [start] 100% [end];
  align-items: center;
  justify-items: center;
}

.cancel {
  grid-column: right-start / right-end;
  margin-right: 0.3rem;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}
</style>
