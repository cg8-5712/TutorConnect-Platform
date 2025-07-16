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

<style scoped>
.not-found {
  text-align: center;
  padding: 20px;
}
</style>