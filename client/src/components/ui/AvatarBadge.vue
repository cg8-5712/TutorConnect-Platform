<template>
  <div class="avatar-badge">
    <img :src="avatarUrl" alt="Avatar" class="avatar" />
    <span class="username">{{ username }}</span>
  </div>
</template>

<script>
export default {
  props: {
    avatarUrl: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.avatar-badge {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.username {
  font-size: 16px;
}
</style>