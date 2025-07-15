<template>
  <nav class="breadcrumbs" v-if="breadcrumbs.length > 1">
    <ol>
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.name">
        <RouterLink 
          v-if="index < breadcrumbs.length - 1" 
          :to="crumb.path"
        >
          {{ crumb.meta.breadcrumb }}
        </RouterLink>
        <span v-else>
          {{ crumb.meta.breadcrumb }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched.filter(
    record => record.meta && record.meta.breadcrumb
  );
  
  return matchedRoutes.map(record => {
    return {
      name: record.name,
      path: record.path,
      meta: record.meta
    };
  });
});
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 20px;
  padding: 10px 0;
  font-size: 0.9rem;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs a {
  color: #4361ee;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumbs a:hover {
  color: #3a0ca3;
  text-decoration: underline;
}

.breadcrumbs .separator {
  margin: 0 10px;
  color: #6c757d;
}

.breadcrumbs span:last-child {
  color: #495057;
  font-weight: 500;
}
</style>