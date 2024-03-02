<template>
  <form
    id="account-by"
    ref="form"
  >
    <label
      v-if="method==='phone'"
      class="label"
    >
      <input
        v-model="phoneNumber"
        class="input"
        type="tel"
        placeholder="手机号"
        @blur="$event.target.pattern='[0-9]{11}'"
      >
      <span class="notice">请输入有效的手机号码</span>
    </label>
    <label
      v-else-if="method==='email'"
      class="label"
    >
      <input
        v-model="mailAddress"
        class="input"
        type="email"
        placeholder="邮箱"
        list="suggestions"
        @blur="$event.target.required=true"
      >
      <span class="notice">请输入有效的邮箱地址</span>
      <datalist id="suggestions">
        <option
          v-for="domain in domains"
          :key="domain"
          :value="mailAddress + '@' + domain"
        />
      </datalist>
    </label>

    <label class="label">
      <input
        v-model="password"
        class="input"
        type="password"
        placeholder="密码"
        @blur="$event.target.required=true"
        @focus="$event.target.value=''"
        @keydown.enter="login"
      >
      <span class="notice">密码不能为空</span>
    </label>

    <input
      type="button"
      class="submit"
      value="登 录"
      @click="login"
    >
  </form>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import SparkMD5 from 'spark-md5';
export default {
  props: ['method'],
  data: function() {
    return {
      phoneNumber: '',
      mailAddress: '',
      password: '',
      domains: [
        '163.com', '126.com', 'yeah.net',
        'vip.163.com', 'vip.126.com', '188.com'
      ]
    };
  },
  methods: {
    login() {
      if (!this.$refs.form.reportValidity()) {
        return;
      }

      let requestBody;
      let api;
      switch (this.method) {
        case 'phone': {
          api = '/login/cellphone';
          requestBody = {
            phone: this.phoneNumber,
            md5_password: SparkMD5.hash(this.password)
          };
          break;
        }
        case 'email': {
          api = '/login';
          requestBody = {
            email: this.mailAddress,
            md5_password: SparkMD5.hash(this.password)
          };
          break;
        }
      }

      fetchJSON(api, requestBody).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$store.commit('auth/login', res.profile.userId);
          this.$router.replace('/account');
        } else {
          alert(res.message);
        }
      });
    }
  }
};
</script>

<style scoped>
#account-by {
  display: grid;
  grid-template-rows: repeat(2, 4rem);
  place-items: center;
}

.label {
  width: 100%;
  height: 100%;
  display: grid;
  font-size: 1rem;
  place-items: center;
  grid-template-rows:
    [start] 1fr [input-start] min-content
    [input-end notice-start] min-content [notice-end end];
  grid-template-columns: 1fr [input-start] 12rem [input-end] 1fr;
}

.input {
  grid-row: input;
  grid-column: input;
  width: 100%;
  height: 1.5rem;
  font-size: 1rem;
  margin: 0;
  padding: 0.3rem;
  outline: none;
  border: none;
  border-radius: 0.3rem;
  background-color: #eee;
}

.input:active, .input:focus {
  box-shadow: inset 0 0 5px #ccc;
}

.input + span {
  visibility: hidden;
  grid-row: notice;
  grid-column: input;
  align-self: start;
  justify-self: end;
  font-size: 0.7rem;
  color: var(--app-color);
}

.input:invalid {
  border: 1px solid var(--app-color);
}

.input:invalid + span {
  visibility: visible;
}

.submit {
  font-size: 1rem;
  background-color: var(--app-color);
  height: 2rem;
  width: 5rem;
  border: none;
  color: white;
  border-radius: 0.3rem;
  appearance: none;
}

.submit:hover, .submit:focus, .submit:active {
  outline: none;
  box-shadow: 0 0 3px var(--app-color);
}
</style>
