import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useBulanStore = defineStore('bulan', {
  state: () => ({
    items: [],
    loading: false,
    isError: false,
  }),
  actions: {
    getlist() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('/master/bulan/get-bulan')
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
