<template>
  <div id="login">
    <nav class="nav">
      <div
        :class="['method', {'active': loginMethod==='phone'}]"
        @click="loginMethod='phone'"
      >
        手机登录
      </div>
      <div
        :class="['method', {'active': loginMethod==='email'}]"
        @click="loginMethod='email'"
      >
        邮箱登录
      </div>
    </nav>
    <div class="shadow" />
    <keep-alive>
      <component
        :is="'login-by'"
        :key="loginMethod"
        class="login-body"
        :method="loginMethod"
      />
    </keep-alive>
  </div>
</template>

<script>
import LoginBy from '@/components/LoginBy.vue';
export default {
  name: 'Login',

  components: {
    LoginBy
  },
  data: function() {
    return {
      loginMethod: 'phone'
    };
  }
};
</script>

<style scoped>
#login {
  grid-row: login;
  grid-column: login;
  align-self: center;
  width: 100%;
  height: 65%;
  background: white;
  border-radius: 1rem;
  display: grid;
  grid-template-rows:
    [nav-start] 3rem [nav-end login-body-start]
    1fr [login-body-end];
  grid-template-columns: [start] 1fr [end];
}

.nav {
  grid-row: nav;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  background-color: white;
  font-size: 1.1rem;
  color: #888;
  font-weight: bold;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}

.shadow {
  grid-row: login-body;
  grid-column: start / end;
  box-shadow: 0 0 10px #ddd;
  height: 100%;
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  z-index: 0;
}

.method {
  list-style-type: none;
  width: 100%;
  height: 100%;
  background-color: white;
  display: grid;
  place-items: center;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 0 10px #ddd;
  user-select: none;
  cursor: pointer;
  z-index: 0;
  transition: all 300ms;
}

.method.active {
  color: var(--app-color);
  box-shadow: 0 0 10px #ddd;
  z-index: 10;
}

.login-body {
  z-index: 20;
  background-color: white;
  border-radius: 0 0 1rem 1rem;
  grid-row: login-body;
  grid-column: start / end;
}
</style>
