<template>
  <div class="teacher-detail" v-if="teacher">
    <h1>{{ teacher.name }}</h1>
    <p>科目: {{ teacher.subject }}</p>
    <p>简介: {{ teacher.bio }}</p>
    <router-link :to="{ name: 'Booking', params: { id: teacher.id } }">预约</router-link>
  </div>
</template>

<script>
export default {
  name: 'TeacherDetail',
  data() {
    return {
      teacher: null, // 教师详情
    };
  },
  mounted() {
    this.fetchTeacherDetail();
  },
  methods: {
    async fetchTeacherDetail() {
      const teacherId = this.$route.params.id;
      // 这里可以调用API获取教师详情数据
      // 假设从API获取数据
      this.teacher = { id: teacherId, name: '张老师', subject: '数学', bio: '有5年教学经验' };
    },
  },
};
</script>

<style scoped>
.teacher-detail {
  padding: 20px;
}
</style>