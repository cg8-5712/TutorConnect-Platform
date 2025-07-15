<template>
  <div class="rating-stars">
    <div class="stars-container">
      <span 
        v-for="star in 5" 
        :key="star" 
        class="star"
        :class="{ 'filled': star <= filledStars, 'half': star === filledStars + 0.5 }"
      >
        <svg v-if="star <= filledStars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <svg v-else-if="star === filledStars + 0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
        </svg>
      </span>
    </div>
    <span class="rating-value" v-if="showValue">{{ rating }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  showValue: {
    type: Boolean,
    default: true
  }
});

const filledStars = computed(() => {
  // 计算整数部分和小数部分
  const integerPart = Math.floor(props.rating);
  const decimalPart = props.rating - integerPart;
  
  // 如果小数部分大于0.75，向上取整
  if (decimalPart > 0.75) return integerPart + 1;
  
  // 如果小数部分大于0.25，显示半星
  if (decimalPart > 0.25) return integerPart + 0.5;
  
  // 否则显示整数星
  return integerPart;
});
</script>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars-container {
  display: flex;
}

.star {
  display: inline-block;
  width: 18px;
  height: 18px;
}

.star svg {
  width: 100%;
  height: 100%;
}

.star.filled svg {
  fill: #ffc107;
}

.star.half svg {
  fill: url(#half-gradient);
}

.rating-value {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}
</style>