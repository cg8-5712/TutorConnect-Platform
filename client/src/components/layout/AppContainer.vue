<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content">
      <slot></slot>
    </main>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import FooterBar from './FooterBar.vue';

export default {
  name: 'AppContainer',
  components: {
    NavBar,
    FooterBar,
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main-content {
    flex: 1;
    padding: 16px;
    background-color: #f9f9f9;
  }
}
</style>
