import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLapPembayaranIuranStore = defineStore('lapPembayaranIuran', {
  state: () => ({
    items: [],
    loading: false,
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
          .get('/laporan/lapyangsudahbayar/get-lap-pembayaran-iuran', params)
          .then((response) => {
            this.items = response.data?.data
            this.loading = false
            resolve(response.data)
          })
          .catch((error) => {
            this.loading = false
            reject(error)
          })
      })
    },
  },
})
