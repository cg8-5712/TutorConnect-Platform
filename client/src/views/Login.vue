<template>
  <div class="login">
    <h1>登录</h1>
    <form @submit.prevent="submitLogin">
      <label for="username">用户名:</label>
      <input type="text" v-model="credentials.username" required />

      <label for="password">密码:</label>
      <input type="password" v-model="credentials.password" required />

      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async submitLogin() {
      // 这里可以调用API进行用户登录
      console.log('登录信息:', this.credentials);
      alert('登录成功！');
    },
  },
};
</script>

<style scoped>
.login {
  padding: 20px;
}
</style>