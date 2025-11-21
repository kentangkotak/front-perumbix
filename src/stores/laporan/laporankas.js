import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLapKasStore = defineStore('lapKas', {
  state: () => ({
    items: [],
    loading: false,
    saldoawal: 0,
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

      let saldo = data?.saldoawal?.nominal || 0
      const masuklagi = masukx.map((x) => {
        saldo += x.nominal
        return {
          tanggal: x.created_at,
          notrans: x.notrans,
          keterangan: x.keterangan ?? 'Iuran Warga',
          penjelasan: x.nama,
          nominal: x.nominal,
          jenis: 'masuk',
          saldo: saldo, // saldo setelah transaksi
        }
      })

      const keluarlagi = []
      keluarx.forEach((x) => {
        x.rincian.forEach((y) => {
          saldo -= y.subtotal
          keluarlagi.push({
            tanggal: x.created_at,
            notrans: x.notrans,
            keterangan: x.keterangan,
            penjelasan: y.namabarang,
            nominal: y.subtotal,
            jenis: 'keluar',
            saldo: saldo, // saldo setelah transaksi
          })
        })
      })

      const gabung = masuklagi.concat(keluarlagi)
      const hasil = gabung.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))

      this.items = hasil
      console.log('gabung dengan saldo', hasil)
    },
  },
})
