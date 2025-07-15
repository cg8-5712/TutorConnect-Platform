<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="请输入搜索关键字"
      @keyup.enter="performSearch"
    />
    <button @click="performSearch">搜索</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    performSearch() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
}
</style>
