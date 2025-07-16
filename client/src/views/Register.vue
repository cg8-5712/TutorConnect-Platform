<template>
  <div class="register">
    <h1>注册</h1>
    <form @submit.prevent="submitRegister">
      <label for="username">用户名:</label>
      <input type="text" v-model="user.username" required />
      
      <label for="email">邮箱:</label>
      <input type="email" v-model="user.email" required />
      
      <label for="password">密码:</label>
      <input type="password" v-model="user.password" required />
      
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitRegister() {
      // 这里可以调用API进行用户注册
      console.log('注册信息:', this.user);
      alert('注册成功！');
    },
  },
};
</script>

<style scoped>
.register {
  padding: 20px;
}
</style>