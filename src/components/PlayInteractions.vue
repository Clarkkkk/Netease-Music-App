<template>
  <div id="play-interactions">
    <app-like-icon class="like" />
    <app-icon
      icon="comment"
      class="comments"
      @click.native="click"
    />
    <app-icon
      icon="vertical-dots"
      class="info"
      @click.native="click"
    />
  </div>
</template>

<script>
import AppLikeIcon from '@/components/AppLikeIcon.vue';
export default {
  components: {
    AppLikeIcon
  },

  methods: {
    click() {
      alert('待开发');
    }
  }
};
</script>

<style scoped>
#play-interactions {
  grid-row: interactions;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 0.5fr repeat(3, 1fr) 0.5fr;
  grid-template-rows: [start] 3rem [end];
  place-items: center;
}

.like {
  grid-column: 2 / 3;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.comments {
  grid-column: 3 / 4;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.info {
  grid-column: 4 / 5;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}
</style>
