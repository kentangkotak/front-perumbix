<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title> Sistem Informasi Perumahan Bengawan Indah </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import router from 'src/router'
import { onMounted, ref } from 'vue'

const menuItems = ref([])

// Ambil data dari localStorage saat layout dimuat
onMounted(() => {
  const storedMenu = localStorage.getItem('menus')
  if (storedMenu) {
    try {
      menuItems.value = JSON.parse(storedMenu)
      // console.log('menuItems', menuItems.value)
    } catch (e) {
      console.error('Gagal parse menu dari localStorage', e)
    }
  }

  window.onpopstate = function () {
    router.push({ name: '/' }) // arahkan ke home
  }

  // Tambahkan history agar back bisa ter-trigger
  history.pushState(null, document.title, location.href)
})
</script>
