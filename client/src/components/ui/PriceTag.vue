<template>
  <div class="price-tag">
    <span class="currency">{{ currency }}</span>
    <span class="price">{{ formattedPrice }}</span>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: '¥',
    },
  },
  computed: {
    formattedPrice() {
      return this.price.toFixed(2);
    },
  },
};
</script>

<style scoped>
.price-tag {
  font-size: 20px;
  font-weight: bold;
}
.currency {
  margin-right: 5px;
}
</style>