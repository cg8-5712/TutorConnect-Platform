<template>
  <div class="scheduling">
    <h2>日程安排</h2>
    <CalendarPicker @date-selected="handleDateSelection" />
    <TimeSlotSelector @time-selected="handleTimeSelection" />
    <div class="summary">
      <h3>选中的日期和时间段:</h3>
      <p>日期: {{ selectedDate }}</p>
      <p>时间段: {{ selectedTime }}</p>
    </div>
  </div>
</template>

<script>
import CalendarPicker from './CalendarPicker.vue';
import TimeSlotSelector from './TimeSlotSelector.vue';

export default {
  name: 'Scheduling',
  components: {
    CalendarPicker,
    TimeSlotSelector,
  },
  data() {
    return {
      selectedDate: '',
      selectedTime: '',
    };
  },
  methods: {
    handleDateSelection(date) {
      this.selectedDate = date;
      console.log('Selected date:', date);
    },
    handleTimeSelection(time) {
      this.selectedTime = time;
      console.log('Selected time:', time);
    },
  },
};
</script>

<style lang="scss" scoped>
.scheduling {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;

  h2 {
    margin-bottom: 20px;
  }

  .summary {
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #ddd;

    h3 {
      margin-bottom: 10px;
    }

    p {
      font-size: 1em;
      color: #555;
    }
  }
}
</style>
