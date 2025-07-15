<template>
  <div class="auth-layout">
    <div class="auth-background"></div>
    <div class="auth-container">
      <div class="auth-card">
        <RouterView />
      </div>
      <div class="auth-footer">
        <p>© 2025 TutorConnect 家教平台. 保留所有权利</p>
        <div class="auth-links">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/about">关于我们</RouterLink>
          <RouterLink to="/pricing">收费标准</RouterLink>
          <RouterLink to="/privacy">隐私政策</RouterLink>
          <RouterLink to="/terms">服务条款</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9ff;
}

.auth-background {
  flex: 1;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  background-size: cover;
  display: none;
}

.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
}

.auth-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.auth-footer {
  margin-top: 30px;
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.auth-links {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.auth-links a {
  color: #4361ee;
  text-decoration: none;
  transition: color 0.2s;
}

.auth-links a:hover {
  color: #3a0ca3;
  text-decoration: underline;
}

@media (min-width: 992px) {
  .auth-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  .auth-background {
    display: block;
    position: relative;
  }
  
  .auth-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('@/assets/images/auth-bg.svg') no-repeat center center;
    background-size: 80%;
    opacity: 0.1;
  }
}
</style>