<template>
  <footer class="footer-bar">
    <p>&copy; 2025 MyApp. 保留所有权利。</p>
    <ul class="footer-links">
      <li><router-link to="/privacy">隐私政策</router-link></li>
      <li><router-link to="/terms">服务条款</router-link></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style lang="scss" scoped>
.footer-bar {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 16px;

  .footer-links {
    list-style: none;
    padding: 0;

    li {
      display: inline;
      margin: 0 10px;

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
