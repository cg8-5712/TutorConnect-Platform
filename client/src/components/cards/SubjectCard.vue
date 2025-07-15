<template>
  <div class="subject-card">
    <h3 class="subject-title">{{ subject.name }}</h3>
    <p class="subject-description">{{ subject.description }}</p>
    <div class="subject-details">
      <p>适合年级: {{ subject.grade }}</p>
      <p>课时费: <PriceTag :price="subject.price" /></p>
    </div>
    <button class="enroll-button" @click="enrollInSubject">报名</button>
  </div>
</template>

<script>
import PriceTag from '../ui/PriceTag.vue';

export default {
  name: 'SubjectCard',
  components: {
    PriceTag,
  },
  props: {
    subject: {
      type: Object,
      required: true,
    },
  },
  methods: {
    enrollInSubject() {
      this.$emit('enroll', this.subject.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.subject-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;

  .subject-title {
    font-size: 1.5em;
    margin: 0;
  }

  .subject-description {
    color: #666;
  }

  .enroll-button {
    background-color: #2196F3;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #1976D2;
    }
  }
}
</style>