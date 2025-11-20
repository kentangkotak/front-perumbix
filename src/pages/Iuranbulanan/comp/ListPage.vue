<template>
  <q-page class="dashboard-bg">
    <!-- Judul dan search -->
    <div class="q-mb-md">
      <div class="text-h5 text-white q-mb-sm">
        Data Pembayaran Iuran Bulan
        <q-btn
          glossy
          round
          color="red"
          icon="add"
          size="sm"
          push
          @click="emits('add')"
          unelevated
        />
      </div>
      <div class="row items-center q-gutter-sm">
        <q-input
          dense
          filled
          v-model="store.params.q"
          placeholder="Cari warga..."
          class="search-input"
          clearable
          @clear="search = ''"
          @update:model-value="store.getlist()"
          :style="{ background: 'white', color: '#000', borderRadius: '8px' }"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="row q-mt-xs q-gutter-xs">
        <div class="col-7">
          <q-select
            v-model="store.params.bulan"
            round
            dense
            outlined
            label="Bulan"
            :options="props.bulan"
            option-label="nama"
            option-value="kode"
            emit-value
            map-options
            :disable="store.loading"
            @update:model-value="store.getlist()"
            class="search-input select-white"
          />
        </div>
        <div class="col-4">
          <q-select
            v-model="store.params.tahun"
            round
            dense
            outlined
            label="Tahun"
            :options="tahunOptions"
            option-label="nama"
            option-value="id"
            emit-value
            map-options
            :disable="store.loading"
            @update:model-value="store.getlist()"
            class="search-input select-white"
          />
        </div>
      </div>
    </div>

    <!-- Grid warga -->
    <div class="warga-grid">
      <template v-if="store.loading">
        <SkeletonCard v-for="n in 6" :key="'skeleton-' + n" />
      </template>
      <template v-else>
        <q-card v-for="w in store.items" :key="w.id" flat bordered class="warga-card q-pa-md">
          <div class="warga-name">{{ w.nama }}</div>
          <div class="warga-email">
            Pembayaran Bulan: {{ getNamaBulan(w?.bulan) }} {{ w?.tahun }}
          </div>
          <div class="warga-email">Cara Bayar: {{ w.cara_bayar }}</div>
          <div class="warga-nik">Iuran: {{ formatDouble(w.nominal) || '-' }}</div>
          <div class="warga-email">Tgl Input: {{ humanDate(w.created_at) }}</div>
          <!-- <div class="warga-username">Username: {{ w.username }}</div> -->
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { formatDouble, humanDate } from 'src/modules/formatter'
import SkeletonCard from 'src/pages/componen/SkeletonCard.vue'
import { usePembayaranIuranBulananStore } from 'src/stores/iuranbulanan/iuranbulanan'
import { getNamaBulan } from 'src/utils/dateHelper'

const store = usePembayaranIuranBulananStore()
const emits = defineEmits(['add', 'edit'])

const props = defineProps({
  bulan: {
    type: Object,
    default: null,
  },
})
const tahunOptions = [store.form.tahun - 1, store.form.tahun, store.form.tahun + 1]
</script>

<style scoped>
.dashboard-bg {
  background: linear-gradient(145deg, #0d0d0d, #1b1b1f, #151923);
  min-height: 100vh;
  padding: 18px;
  overflow-x: hidden;
}

/* SEARCH INPUT */
.search-input {
  width: 100%;
  margin-bottom: 10px;
}

.search-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  transition: 0.25s;
}

.search-input :deep(.q-field__control:hover),
.search-input :deep(.q-field--focused .q-field__control) {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ff4444;
}

/* GRID KARTU */
.warga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 18px;
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

.warga-name {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 1.2rem;
}

.warga-nik {
  font-size: 0.95rem;
  opacity: 0.85;
}

.select-white :deep(.q-field__control) {
  background: rgba(255, 255, 255, 1) !important;
  color: #000 !important;
  border-radius: 8px;
}

.select-white :deep(.q-field__native) {
  color: #000 !important;
}

.select-white :deep(.q-field__label) {
  color: #444 !important;
}
</style>
