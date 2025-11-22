<template>
  <q-page class="dashboard-bg">
    <div class="warga-grid">
      <!-- Loading -->
      <template v-if="store.loading">
        <SkeletonCard v-for="n in 6" :key="'skeleton-' + n" />
      </template>

      <!-- Konten setelah load -->
      <template v-else>
        <!-- Saldo Awal -->
        <q-card class="saldo-card">
          <div class="row q-pa-sm">
            <div class="col-6 warga-name">Saldo Awal</div>
            <div class="col-6 warga-name text-weight-bold text-right">
              Rp. {{ formatDouble(store.saldoawal) }}
            </div>
          </div>
        </q-card>

        <!-- Transaksi -->
        <q-card v-for="(x, index) in store.items" :key="index" :class="['warga-card', x.jenis]">
          <div class="row q-pa-sm">
            <div class="col-6">
              <div>{{ x.keterangan }}</div>
              <small class="penjelasan">{{ x.penjelasan }}</small>
            </div>
            <div class="col-6 text-right">
              Rp. {{ formatDouble(x.nominal) }}
              <div class="saldo-akhir">Saldo: Rp. {{ formatDouble(x.saldo) }}</div>
            </div>
          </div>
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
import SkeletonCard from 'src/pages/componen/SkeletonCard.vue'
import { useLapKasStore } from 'src/stores/laporan/laporankas'

const store = useLapKasStore()
</script>

<style scoped>
.dashboard-bg {
  background: linear-gradient(145deg, #0d0d0d, #1b1b1f, #151923);
  min-height: 100vh;
  padding: 18px;
  overflow-x: hidden;
}

/* GRID KARTU */
.warga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

/* CARD SALDO AWAL */
.saldo-card {
  border-radius: 16px;
  background: rgb(240, 216, 5);
  backdrop-filter: blur(12px);
  color: #131101;
  font-weight: 600;
  padding: 12px;
}

/* CARD TRANSAKSI */
.trans-card {
  border-radius: 16px;
  padding: 12px;
  backdrop-filter: blur(10px);
  color: #f5f5f5;
}

/* CARD WARGA */
.warga-card {
  border-radius: 18px;
  padding: 18px;
  background: rgba(30, 30, 30, 0.55);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6);
  color: #f5f5f5;
  cursor: pointer;

  transform: translateY(0);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.warga-card:hover {
  transform: translateY(-8px);
  background: rgba(50, 50, 50, 0.65);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85);
}

/* masuk = hijau, keluar = merah */
.warga-card.masuk {
  background: rgba(20, 150, 80, 0.25);
}

.warga-card.keluar {
  background: rgba(200, 40, 60, 0.25);
}

/* teks penjelasan */
.penjelasan {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* saldo akhir */
.saldo-akhir {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffd700;
  margin-top: 4px;
}
</style>
