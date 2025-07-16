<template>
  <div id="app">
    <header>
      <h1>Welcome to TutorConnect 家教平台</h1>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/teachers">教师列表</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2025 TutorConnect. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 10px;
}

nav {
  margin: 10px 0;
}

nav a {
  margin: 0 15px;
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

footer {
  margin-top: 20px;
  font-size: 12px;
}
</style>
<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <router-link to="/">返回首页</router-link>
  </div>
</template>
<script>
export default {
  name: 'NotFound',
};
</script>