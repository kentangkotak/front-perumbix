import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useNominalIuranStore = defineStore('nominalIuran', {
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
          .get('/master/nominaliuran/get-iuran')
          .then((response) => {
            this.items = response.data
            // console.log(this.items)
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
