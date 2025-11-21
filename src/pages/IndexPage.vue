<template>
  <AppLoader :show="pageLoading" />
  <q-page class="dashboard-bg" padding>
    <!-- Profil User -->
    <q-card flat bordered class="profile-card q-mb-md">
      <div class="profile-bg">
        <div class="profile-avatar">
          <q-avatar size="80px" class="avatar-border">
            <img
              :src="
                user.avatar ||
                'https://i0.wp.com/www.rukita.co/stories/wp-content/uploads/2022/04/3b0440d25a78d581953ddc0a1237615e.webp?w=600&ssl=1'
              "
              alt="User"
            />
          </q-avatar>
        </div>
        <div class="profile-info">
          <div class="text-h6">{{ user.name }}</div>
          <div class="text-subtitle2">{{ user.email }}</div>
        </div>
      </div>
    </q-card>

    <!-- Card Pembungkus Menu Grid -->
    <q-card flat bordered class="menu-container q-pa-md">
      <q-card-section>
        <div class="menu-grid">
          <q-card
            v-for="item in menuItems"
            :key="item.name"
            class="menu-card"
            flat
            bordered
            clickable
            v-ripple
            :style="{ background: item.color }"
            @click="navigate(item.link)"
          >
            <q-card-section class="row items-center justify-center">
              <q-icon :name="item.icon" size="36px" class="text-white" />
            </q-card-section>
            <q-card-section class="text-center">
              <div class="menu-label">{{ item.label }}</div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
    <!-- Card Cuaca -->
    <q-card flat bordered class="cuaca-card q-pa-md">
      <div v-for="(group, tanggal) in groupedCuaca" :key="tanggal" class="q-mb-xl">
        <!-- Judul Tanggal -->
        <div class="text-h8 text-white q-mb-sm text-weight-bold text-center">
          Prakiraan Cuaca untuk daerah PERUM Bengawan Indah pada Tanggal
          <span class="text-h6"> {{ tanggal }}</span>
        </div>

        <!-- TABLE STYLE -->
        <div class="cuaca-table text-italic">
          <!-- HEADER -->
          <div class="cuaca-row header">
            <div align="center">Jam</div>
            <div align="center">Suhu</div>
            <!-- <div align="center">Hujan</div> -->
            <!-- <div>Angin</div> -->
            <div align="center">Cuaca</div>
          </div>

          <!-- DATA -->
          <div class="cuaca-row" v-for="(item, i) in group" :key="i">
            <div align="center">{{ item.jam }}</div>
            <div align="center">{{ item.suhu }}°C</div>
            <!-- <div align="center">{{ item.hujan }} mm</div> -->
            <!-- <div>{{ item.angin }} km/jam</div> -->
            <div align="center">{{ item.cuaca }}</div>
            <div align="center"><img :src="item.image" width="40" /></div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- Bottom Bar -->
    <BottomBar />
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomBar from 'src/pages/componen/BottomBar.vue'
import { useAutoLogout } from 'src/boot/autologout'
import { useCuacaStore } from 'src/stores/cuaca'
import { storeToRefs } from 'pinia'
import AppLoader from './componen/AppLoader.vue'

const router = useRouter()
const pageLoading = ref(true)
useAutoLogout(router)
const storecuaca = useCuacaStore()

const user = ref({
  name: '',
  email: '',
  avatar: '',
})

const menuItems = ref([])

const navigate = (link) => router.push(link)
// const goHome = () => router.push('/')
// const logoutUser = () => router.push('/login')

onMounted(() => {
  pageLoading.value = true
  // Ambil user dari localStorage
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch (e) {
      console.error('Gagal parsing user data dari localStorage', e)
    }
  }

  // Ambil menu dari localStorage
  const menuData = localStorage.getItem('menus')
  if (menuData) {
    try {
      const parsedMenu = JSON.parse(menuData)
      if (Array.isArray(parsedMenu)) menuItems.value = parsedMenu
    } catch (e) {
      console.error('Gagal parsing menu data dari localStorage', e)
    }
  }

  storecuaca.getCuaca()
  setTimeout(() => {
    pageLoading.value = false
  }, 4000) // biar smooth transition
})
const { listJam } = storeToRefs(storecuaca)

const groupedCuaca = computed(() => {
  const out = {}

  listJam.value.forEach((item) => {
    if (!out[item.tanggal]) out[item.tanggal] = []
    out[item.tanggal].push(item)
  })

  return out
})
</script>

<style scoped>
/* Background Dark Elegan */
.dashboard-bg {
  background: linear-gradient(160deg, #0f0f0f, #1a1a1a, #111827);
  min-height: 100vh;
  padding: 16px;
}

/* Profil Card Dark Frosted Glass */
.profile-card {
  border-radius: 20px;
  overflow: visible;
  position: relative;
  height: 180px;
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.9);
}

.profile-bg {
  background: linear-gradient(135deg, #1e1e2f, #2c2c3e);
  padding: 24px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-info div {
  color: #e0e0e0;
}

/* Menu Container Dark Frosted */
.menu-container {
  border-radius: 20px;
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7);
}

/* Grid Menu */
.menu-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.menu-card {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.9);
}

.menu-card .text-white {
  color: #f0f0f0;
}

.menu-label {
  color: #f0f0f0;
  font-weight: 600;
}

.cuaca-card {
  border-radius: 20px;
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
}

.scroll-x {
  overflow-x: auto;
  padding-bottom: 8px;
}

.cuaca-table {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ffffff22;
}

.cuaca-row {
  display: grid;
  grid-template-columns: 70px 60px 70px 80px 1fr;
  padding: 10px 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid #ffffff15;
  color: white;
}

.cuaca-row:last-child {
  border-bottom: none;
}

.cuaca-row.header {
  background: rgba(255, 255, 255, 0.15);
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.cuaca-row.header div {
  padding: 4px 0;
}

@media (min-width: 600px) {
  .menu-card {
    width: 140px;
    height: 140px;
  }
}
</style>
