<template>
  <div class="time-slot-selector">
    <label for="time-select">选择时间段:</label>
    <select id="time-select" v-model="selectedTime" @change="updateTime">
      <option v-for="slot in timeSlots" :key="slot" :value="slot">
        {{ slot }}
      </option>
    </select>
    <p>选择的时间段: {{ selectedTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'TimeSlotSelector',
  data() {
    return {
      selectedTime: '',
      timeSlots: [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
      ],
    };
  },
  methods: {
    updateTime() {
      this.$emit('time-selected', this.selectedTime);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-slot-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;

  select {
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
