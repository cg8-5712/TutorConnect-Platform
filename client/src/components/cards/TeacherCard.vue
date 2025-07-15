<template>
  <div class="teacher-card">
    <img :src="teacher.avatar" alt="Teacher Avatar" class="avatar" />
    <div class="teacher-info">
      <h3 class="teacher-name">{{ teacher.name }}</h3>
      <p class="teacher-subject">{{ teacher.subjects.join(', ') }}</p>
      <div class="teacher-rating">
        <RatingStars :rating="teacher.rating" />
      </div>
      <p class="teacher-price">课时费: <PriceTag :price="teacher.price" /></p>
      <button class="contact-button" @click="contactTeacher">联系教师</button>
    </div>
  </div>
</template>

<script>
import RatingStars from '../ui/RatingStars.vue';
import PriceTag from '../ui/PriceTag.vue';

export default {
  name: 'TeacherCard',
  components: {
    RatingStars,
    PriceTag,
  },
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },
  methods: {
    contactTeacher() {
      this.$emit('contact', this.teacher.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .teacher-info {
    flex: 1;

    .teacher-name {
      font-size: 1.2em;
      margin: 0;
    }

    .teacher-subject {
      color: #666;
    }

    .contact-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }
  }
}
</style>