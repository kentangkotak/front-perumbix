<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header & Drawer bisa diaktifkan nanti jika perlu -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItems = ref([])

// Ambil data dari localStorage saat layout dimuat
onMounted(() => {
  const storedMenu = localStorage.getItem('menus')
  if (storedMenu) {
    try {
      menuItems.value = JSON.parse(storedMenu)
    } catch (e) {
      console.error('Gagal parse menu dari localStorage', e)
    }
  }

  // Atur back button di PWA: redirect ke home tanpa memanipulasi history manual
  window.addEventListener('popstate', () => {
    if (router.currentRoute.value.path !== '/') {
      router.replace('/') // aman, tidak memicu warning
    }
  })
})
</script>
