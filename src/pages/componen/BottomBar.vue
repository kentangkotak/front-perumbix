<template>
  <q-footer class="bottom-bar bg-white shadow-2 q-px-md q-pt-sm q-pb-sm">
    <div class="row justify-around items-center">
      <q-btn flat rounded color="primary" icon="home" label="Home" @click="goHome()" />
      <q-btn flat rounded color="negative" icon="logout" label="Exit" @click="logoutUser()" />
    </div>
  </q-footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/')
}

function logoutUser() {
  router.push('/logout')
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}
</style>
