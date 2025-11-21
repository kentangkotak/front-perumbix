<template>
  <q-page class="dashboard-bg">
    <div class="warga-grid">
      <template v-if="store.loading">
        <SkeletonCard v-for="n in 6" :key="'skeleton-' + n" />
      </template>
      <template v-else>
        <!-- Saldo Awal -->
        <q-card class="saldo-card">
          <div class="row q-pa-sm">
            <div class="col-6 warga-name">Saldo Awal</div>
            <div class="col-6 warga-name text-right">Rp. {{ formatDouble(store.saldoawal) }}</div>
          </div>
        </q-card>

        <!-- Transaksi -->
        <q-card-section
          v-for="(x, index) in store.items"
          :key="index"
          :class="['trans-card', x.jenis]"
        >
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
        </q-card-section>
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
  background: rgba(255, 215, 0, 0.1);
  backdrop-filter: blur(12px);
  color: #fff3b0;
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

/* masuk = hijau, keluar = merah */
.trans-card.masuk {
  background: rgba(20, 150, 80, 0.25);
}

.trans-card.keluar {
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
