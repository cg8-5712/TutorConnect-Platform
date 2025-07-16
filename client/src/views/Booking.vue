<template>
  <div class="booking">
    <h1>预约教师</h1>
    <form @submit.prevent="submitBooking">
      <label for="date">预约日期:</label>
      <input type="date" v-model="booking.date" required />
      
      <label for="time">预约时间:</label>
      <input type="time" v-model="booking.time" required />
      
      <button type="submit">提交预约</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Booking',
  data() {
    return {
      booking: {
        date: '',
        time: '',
      },
    };
  },
  methods: {
    async submitBooking() {
      // 这里可以调用API提交预约
      console.log('预约信息:', this.booking);
      alert('预约成功！');
    },
  },
};
</script>

<style scoped>
.booking {
  padding: 20px;
}
</style>