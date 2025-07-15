<template>
  <div class="search-container">
    <SearchBar @search="onSearch" />
    <FilterPanel @filter="onFilter" />
    <div v-if="results.length > 0">
      <h3>搜索结果:</h3>
      <ul>
        <li v-for="result in results" :key="result.id">{{ result.name }}</li>
      </ul>
    </div>
    <div v-else>
      <p>没有找到结果。</p>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import FilterPanel from './FilterPanel.vue';

export default {
  components: {
    SearchBar,
    FilterPanel,
  },
  data() {
    return {
      results: [],
    };
  },
  methods: {
    onSearch(query) {
      console.log('搜索关键字:', query);
      // 在这里处理搜索逻辑，假设从 API 获取数据
      this.fetchResults(query);
    },
    onFilter(filters) {
      console.log('过滤条件:', filters);
      // 在这里处理过滤逻辑
      this.applyFilters(filters);
    },
    fetchResults(query) {
      // 模拟 API 调用
      // 可以替换为实际的 API 请求
      const mockResults = [
        { id: 1, name: '结果 1' },
        { id: 2, name: '结果 2' },
        { id: 3, name: '结果 3' },
      ];
      // 根据查询关键字过滤结果
      this.results = mockResults.filter(result =>
        result.name.includes(query)
      );
    },
    applyFilters(filters) {
      // 在这里根据过滤条件对结果进行过滤
      // 例如：根据 selectedCategory 和 priceRange 进行过滤
      // 可以添加过滤逻辑
    },
  },
};
</script>

<style scoped>
.search-container {
  padding: 20px;
}
</style>
