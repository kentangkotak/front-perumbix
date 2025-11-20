<template>
  <q-page class="dashboard-bg q-pa-md">
    <!-- <div class="form-container"> -->
    <q-card flat bordered class="form-card q-pa-lg">
      <q-btn
        flat
        dense
        icon="arrow_back"
        label="Kembali"
        class="btn-back q-mb-md"
        @click="emits('back')"
      />

      <div class="text-h5 text-center text-white q-mb-md">Form Data Warga</div>

      <q-form @submit="onSubmit">
        <q-input
          v-model="store.form.nama"
          label="Nama Lengkap"
          dense
          filled
          class="form-input"
          dark
          :rules="[(val) => !!val || 'Wajib diisi']"
        />

        <q-input
          v-model="store.form.nokk"
          label="NO. KK"
          dense
          filled
          class="form-input"
          dark
          :rules="[(val) => !!val || 'Wajib diisi']"
        />

        <div class="q-mt-lg flex justify-between">
          <q-btn label="Reset" color="grey-7" flat class="btn-reset" />
          <q-btn
            type="submit"
            label="Simpan"
            color="red-7"
            glossy
            class="btn-submit"
            :loading="store.loading"
          />
        </div>
      </q-form>
    </q-card>
    <!-- </div> -->
  </q-page>
</template>

<script setup>
import { useWargaStore } from 'src/stores/Warga/warga'

const store = useWargaStore()

const emits = defineEmits(['back'])
function onSubmit() {
  console.log('store.form')
  store.simpan()
}
</script>

<style scoped>
.form-card {
  border-radius: 20px;
  background: rgba(30, 30, 30, 0.55);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.8);
  color: #fff;
}

/* Input */
.form-input {
  margin-bottom: 18px;
}

.form-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s;
}

.form-input :deep(.q-field__control:hover),
.form-input :deep(.q-field--focused .q-field__control) {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Button */
.btn-submit {
  border-radius: 14px;
  padding: 8px 25px;
  font-weight: bold;
}

.btn-reset {
  border-radius: 14px;
  padding: 8px 25px;
  color: #bbb;
}
</style>
