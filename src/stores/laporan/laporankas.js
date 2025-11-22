import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLapKasStore = defineStore('lapKas', {
  state: () => ({
    items: [],
    loading: false,
    saldoawal: 0,
    tanggaltutupsaldo: null,
    params: {
      bulan: new Date().getMonth() + 1,
      tahun: new Date().getFullYear(),
    },
    isError: false,
  }),
  actions: {
    setParams() {
      this.getlist()
    },
    getlist() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('/laporan/lapyangsudahbayar/get-lap-kas', params)
          .then((response) => {
            const data = response.data || []
            this.olahdata(data)
            this.saldoawal = response.data?.saldoawal?.nominal
            this.tanggaltutupsaldo = response.data?.saldoawal?.tgltutup
            this.loading = false
            resolve(response.data)
          })
          .catch((error) => {
            this.loading = false
            reject(error)
          })
      })
    },
    olahdata(data = []) {
      const masukx = data?.masuk || []
      const keluarx = data?.keluar || []

      // Gabung semua transaksi tanpa hitung saldo dulu
      const semuaTransaksi = []

      masukx.forEach((x) => {
        semuaTransaksi.push({
          tanggal: x.created_at,
          notrans: x.notrans,
          keterangan: 'Iuran Warga',
          penjelasan: x.nama,
          nominal: x.nominal,
          jenis: 'masuk',
        })
      })

      keluarx.forEach((x) => {
        x.rincian.forEach((y) => {
          semuaTransaksi.push({
            tanggal: x.created_at,
            notrans: x.notrans,
            keterangan: x.keterangan,
            penjelasan: y.namabarang,
            nominal: y.subtotal,
            jenis: 'keluar',
          })
        })
      })

      // Urutkan semua transaksi berdasarkan tanggal
      semuaTransaksi.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))

      // Hitung saldo setelah diurutkan
      let saldo = data?.saldoawal?.nominal || 0
      semuaTransaksi.forEach((trx) => {
        if (trx.jenis === 'masuk') saldo += trx.nominal
        else saldo -= trx.nominal

        trx.saldo = saldo
      })

      this.items = semuaTransaksi
    },
  },
})
