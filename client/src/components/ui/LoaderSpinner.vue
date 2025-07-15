<template>
  <div class="loader-spinner" v-if="isLoading">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loader-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  border: 4px solid lightgray;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>