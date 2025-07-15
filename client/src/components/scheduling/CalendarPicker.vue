<template>
  <div class="calendar-picker">
    <input type="date" v-model="selectedDate" @change="updateDate" />
    <p>选择的日期: {{ formattedDate }}</p>
  </div>
</template>

<script>
export default {
  name: 'CalendarPicker',
  data() {
    return {
      selectedDate: '',
    };
  },
  computed: {
    formattedDate() {
      return this.selectedDate ? new Date(this.selectedDate).toLocaleDateString() : '无';
    },
  },
  methods: {
    updateDate() {
      this.$emit('date-selected', this.selectedDate);
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;

  input[type='date'] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  p {
    font-size: 1em;
    color: #333;
  }
}
</style>