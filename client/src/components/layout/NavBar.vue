<template>
  <nav class="nav-bar">
    <div class="logo">MyApp</div>
    <ul class="nav-links">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/teachers">教师</router-link></li>
      <li><router-link to="/subjects">课程</router-link></li>
      <li><router-link to="/about">关于我们</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4CAF50;
  padding: 16px;
  color: white;

  .logo {
    font-size: 1.5em;
    font-weight: bold;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;

    li {
      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
