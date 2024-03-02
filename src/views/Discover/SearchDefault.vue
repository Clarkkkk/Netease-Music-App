<template>
  <div id="discover-search-default">
    <div
      v-if="loading"
      class="loading"
    >
      <app-loading-icon />
    </div>
    <div
      v-else
      class="content"
    >
      <div
        v-show="!typing"
        class="hot-title"
      >
        热搜榜
      </div>
      <div
        v-show="!typing"
        class="hot"
      >
        <div
          v-for="item in searchHotData"
          v-show="!typing"
          :key="item.score"
          class="hot-item"
          @click="search(item.searchWord)"
        >
          {{ item.searchWord }}
        </div>
      </div>

      <div
        v-show="typing"
        class="text"
      >
        搜索「{{ searchText }}」
      </div>
      <div
        v-show="typing"
        class="advice"
      >
        <div
          v-for="item in searchAdviceData"
          v-show="typing"
          :key="item.keyword"
          class="advice-item"
          @click="search(item.keyword)"
        >
          <app-icon
            icon="search"
            class="advice-item-icon"
          />
          {{ item.keyword }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '@/functions/debounce.js';
import fetchJSON from '@/functions/fetchJSON.js';
import AppLoadingIcon from '@/components/AppLoadingIcon.vue';
export default {
  name: 'DiscoverSearchDefault',

  components: {
    AppLoadingIcon
  },
  props: ['searchText'],
  data: function() {
    return {
      searchAdviceData: [],
      searchHotData: [],
      loading: true,
      typing: false
    };
  },

  watch: {
    searchText: function(newVal) {
      if (newVal) {
        this.typing = true;
      } else {
        this.typing = false;
      }
      if (newVal.trim()) {
        this.searchAdvice(newVal);
      }
    }
  },

  created: function() {
    fetchJSON('/search/hot/detail')
      .then((data) => {
        this.searchHotData = data.data;
        this.loading = false;
      });
  },

  methods: {
    searchAdvice(text) {
      debounce(() => {
        this.loading = true;
        fetchJSON('/search/suggest', {
          keywords: text,
          type: 'mobile'
        }).then((data) => {
          this.searchAdviceData = data.result.allMatch;
          this.loading = false;
        });
      });
    },

    search(text) {
      console.log(text);
      if (typeof text === 'string') {
        this.$emit('update:searchText', text);
        // this.searchText not changed yet
        this.$router.push('/search/result/' + text);
        console.log('search:' + this.searchText);
      }
    }
  }
};
</script>

<style scoped>
#discover-search-default {
  height: 100%;
  background-color: white;

}

.content {
  display: grid;
  grid-template-rows:
    [start title-start]
    3rem [title-end list-start] 1fr [list-end end];
  align-items: center;
  justify-items: center;
}

/* hot list */
.hot-title {
  grid-row: title-start / title-end;
  padding: 0 1rem;
  justify-self: start;
  align-self: end;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.1rem;
  user-select: none;
}

.hot {
  grid-row: list-start / list-end;
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}

.hot-item {
  margin: 0.3rem;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
  line-height: 1.2rem;
  height: 1.2rem;
  border: 1px var(--app-color) solid;
  border-radius: 1.2rem;
  cursor: pointer;
}
/* hot list */

/* search advice */
.text {
  grid-row: title-start / title-end;
  height: 100%;
  width: 100%;
  justify-self: start;
  align-self: center;
  padding: 0 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.1rem;
  color: var(--app-color);
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  display: grid;
  align-items: center;
}

.advice {
  grid-row: list-start / list-end;
  width: 100%;
  justify-self: start;
  align-self: start;
  display: grid;
  grid-template-rows: 3rem;
  grid-auto-rows: 3rem;
  align-items: center;
  justify-items: start;
}

.advice-item {
  height: 100%;
  width: 100%;
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 3rem;
  grid-auto-flow: column;
  justify-items: start;
  align-items: center;
}

.advice-item-icon {
  justify-self: center;
}
/* search advice */
</style>
