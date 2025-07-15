<template>
  <div class="default-layout">
    <NavBar />
    <main class="main-content">
      <div class="container">
        <Breadcrumbs v-if="showBreadcrumbs" />
        <RouterView />
      </div>
    </main>
    <FooterBar />
    <NotificationCenter />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/layout/NavBar.vue';
import FooterBar from '@/components/layout/FooterBar.vue';
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue';
import NotificationCenter from '@/components/ui/NotificationCenter.vue';

const route = useRoute();

// 在404页面不显示面包屑
const showBreadcrumbs = computed(() => {
  return route.name !== 'not-found';
});
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 30px 0 60px;
  background-color: #f8f9ff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>