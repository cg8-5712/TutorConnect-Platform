<template>
  <div class="teacher-list">
    <h1>教师列表</h1>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        <router-link :to="{ name: 'TeacherDetail', params: { id: teacher.id }}">
          {{ teacher.name }} - {{ teacher.subject }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TeacherList',
  data() {
    return {
      teachers: [], // 教师列表
    };
  },
  mounted() {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers() {
      // 这里可以调用API获取教师数据
      // 假设从API获取数据
      this.teachers = [
        { id: 1, name: '张老师', subject: '数学' },
        { id: 2, name: '李老师', subject: '英语' },
      ];
    },
  },
};
</script>

<style scoped>
.teacher-list {
  padding: 20px;
}
</style>