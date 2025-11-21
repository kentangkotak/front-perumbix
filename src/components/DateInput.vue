<template>
  <q-input
    ref="refInputDate"
    :label="label"
    :outlined="outlined"
    :dense="dense"
    :filled="filled"
    :readonly="readonly"
    :disable="disable"
    :model-value="displayValue"
    @update:model-value="onManualInput"
    @click="showDate"
    class="cursor-pointer"
    lazy-rules
    no-error-icon
    :rules="rules"
  >
    <template v-if="icon" #append>
      <q-icon :name="icon" size="18px" @click="showDate" />
    </template>

    <template #prepend>
      <q-popup-proxy ref="refPopup" cover transition-show="scale" transition-hide="scale">
        <q-date
          v-if="typeDate"
          v-model="internalValue"
          mask="YYYY-MM-DD"
          today-btn
          @update:model-value="onSelectDate"
        >
          <div class="row items-center justify-end">
            <q-btn flat color="primary" label="Tutup" v-close-popup />
          </div>
        </q-date>

        <q-time v-else v-model="internalValue" format24h @update:model-value="onSelectDate">
          <div class="row items-center justify-end">
            <q-btn flat color="primary" label="Tutup" v-close-popup />
          </div>
        </q-time>
      </q-popup-proxy>
    </template>
  </q-input>
</template>

<script setup>
import { ref, watch } from 'vue'
// import { date as qdate } from 'quasar'

const props = defineProps({
  modelValue: { type: String, default: '' }, // YYYY-MM-DD atau HH:mm:ss
  label: { type: String, default: 'Tanggal' },
  typeDate: { type: Boolean, default: true }, // false = Time picker
  icon: { type: String, default: 'event' },
  outlined: { type: Boolean, default: true },
  filled: { type: Boolean, default: false },
  dense: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  rules: { type: Array, default: () => [(v) => !!v || 'Wajib diisi'] },
})

const emit = defineEmits(['update:modelValue'])

const refPopup = ref(null)
const internalValue = ref(props.modelValue) // disimpan dalam format ISO (YYYY-MM-DD)
const displayValue = ref('')

// list nama bulan Indonesia
const bulanIndo = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

/**
 * Ubah format ISO → tampilan Indo
 */
function toDisplay(val) {
  if (!val) return ''
  try {
    const [y, m, d] = val.split('-')
    const namaBulan = bulanIndo[parseInt(m) - 1] || m
    return `${d} ${namaBulan} ${y}`
  } catch {
    return val
  }
}

/**
 * Parse input manual Indo → ISO
 */
function fromDisplay(val) {
  if (!val) return ''
  const parts = val.trim().split(' ')
  if (parts.length === 3) {
    const d = parts[0].padStart(2, '0')
    const bulan = bulanIndo.findIndex((b) => b.toLowerCase().startsWith(parts[1].toLowerCase()))
    if (bulan >= 0) {
      const m = String(bulan + 1).padStart(2, '0')
      return `${parts[2]}-${m}-${d}`
    }
  }
  // fallback parse ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  return ''
}

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    displayValue.value = toDisplay(val)
  },
  { immediate: true },
)

function onSelectDate(val) {
  internalValue.value = val
  displayValue.value = toDisplay(val)
  emit('update:modelValue', val)
}

function onManualInput(val) {
  displayValue.value = val
  const parsed = fromDisplay(val)
  if (parsed) emit('update:modelValue', parsed)
}

function showDate() {
  refPopup.value?.show()
}
</script>

<style scoped>
.q-field__control {
  border-style: solid !important;
}
</style>
