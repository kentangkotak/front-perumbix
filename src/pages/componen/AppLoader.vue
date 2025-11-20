<template>
  <div v-if="show" class="loader-wrap">
    <div class="loader-box">
      <div class="spinner"></div>
      <div class="loader-text">Memuat...</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  show: { type: Boolean, default: false },
})
</script>

<style scoped>
.loader-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Kotak loading */
.loader-box {
  padding: 30px 40px;
  background: rgba(20, 20, 20, 0.85);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.08);
  animation: pulseBox 2s infinite ease-in-out;
}

/* Animasi lingkaran */
.spinner {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 4px solid #ffffff40;
  border-top-color: #4f8cff;
  border-right-color: #4f8cff;
  animation: spin 0.8s linear infinite;
}

/* teks */
.loader-text {
  margin-top: 14px;
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
}

/* Animasi */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulseBox {
  0% {
    box-shadow: 0 0 20px rgba(79, 140, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 35px rgba(79, 140, 255, 0.25);
  }
  100% {
    box-shadow: 0 0 20px rgba(79, 140, 255, 0.1);
  }
}
</style>
