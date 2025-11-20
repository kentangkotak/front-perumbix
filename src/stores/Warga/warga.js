import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifError, notifSuccess } from 'src/modules/notifs'

export const useWargaStore = defineStore('mwarga', {
  state: () => ({
    items: [],
    loading: false,
    dialog: false,
    params: {
      q: '',
    },
    form: {
      id: '',
      nama: '',
      nokk: '',
    },
    isError: false,
  }),
  actions: {
    getlist() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('/master/warga/get-warga', params)
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
    simpan() {
      this.loading = true
      this.isError = false
      return new Promise((resolve, reject) => {
        api
          .post('/master/warga/simpan', this.form)
          .then(({ data }) => {
            const newData = data?.data
            if (this.form.id === '') {
              this.items.push(newData)
            } else {
              this.items = this.items.map((item) => {
                if (item.id === newData.id) {
                  return newData
                }
                return item
              })
            }
            this.initReset()
            notifSuccess(data?.message)
            this.loading = false
            resolve(data)
          })
          .catch((err) => {
            notifError(err)
            this.loading = false
            reject(err)
          })
      })
    },
    initReset() {
      this.form.id = ''
      this.form.nama = ''
      this.form.nokk = ''
    },
  },
})
