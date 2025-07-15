<template>
  <div class="filter-panel">
    <h3>筛选选项</h3>
    <div>
      <label for="category">选择类别:</label>
      <select v-model="selectedCategory" @change="applyFilters">
        <option value="">所有类别</option>
        <option value="category1">类别 1</option>
        <option value="category2">类别 2</option>
        <option value="category3">类别 3</option>
      </select>
    </div>
    <div>
      <label for="priceRange">价格范围:</label>
      <input
        type="number"
        v-model.number="minPrice"
        placeholder="最小价格"
        @change="applyFilters"
      />
      <input
        type="number"
        v-model.number="maxPrice"
        placeholder="最大价格"
        @change="applyFilters"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',
      minPrice: null,
      maxPrice: null,
    };
  },
  methods: {
    applyFilters() {
      this.$emit('filter', {
        category: this.selectedCategory,
        priceRange: { min: this.minPrice, max: this.maxPrice },
      });
    },
  },
};
</script>

<style scoped>
.filter-panel {
  margin-top: 20px;
}
</style>
