<template>
  <div class="q-pa-md">
    <!-- Judul -->
    <div class="text-center q-mb-md">
      <!-- <div class="text-bold text-h6">PERUAMAHAN BENGAWAN INDRAH</div>
      <div class="text-subtitle2">Jl. Bengawan Solo</div>
      <q-separator class="q-my-sm" /> -->
      <div class="text-bold text-h6">LAPORAN PEMBAYARAN KAS</div>
      <div class="text-bold text-h6">PERUAMAHAN BENGAWAN INDRAH</div>
      <div class="text-caption">
        Bulan {{ getNamaBulan(bulanx) }} {{ tahun }}<br />
        Dicetak: {{ formatTanggal(new Date()) }}
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <!-- Daftar Data -->
    <div
      v-for="(item, index) in items"
      :key="item.notrans || index"
      class="q-mb-md q-pa-sm"
      style="border: 1px solid #ccc; border-radius: 6px"
    >
      <div class="row q-col-gutter-sm">
        <!-- Kolom 1 -->
        <div class="col-4">
          <div><strong>Notrans:</strong> {{ item.notrans }}</div>
          <div><strong>Nama:</strong> {{ item.nama }}</div>
        </div>

        <!-- Kolom 2 -->
        <div class="col-4">
          <div><strong>Bulan Bayar:</strong> {{ getNamaBulan(item.bulan) }} {{ item.tahun }}</div>
          <div><strong>Nominal:</strong> Rp. {{ formatDouble(item.nominal) }}</div>
          <div><strong>Cara Bayar:</strong> {{ item.cara_bayar }}</div>
        </div>

        <!-- Kolom 3 -->
        <div class="col-4">
          <div><strong>Keterangan:</strong> {{ item.keterangan }}</div>
          <div><strong>Tanggal Bayar:</strong> {{ formatTanggal(item.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
import { getNamaBulan } from 'src/utils/dateHelper'

defineProps({
  items: Array,
  bulanx: Number,
  tahun: Number,
})

function formatTanggal(tanggal) {
  if (!tanggal) return '-'
  const date = new Date(tanggal)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.text-h6 {
  font-size: 18px;
}
.text-bold {
  font-weight: bold;
}
</style>
