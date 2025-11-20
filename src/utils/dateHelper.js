// src/utils/dateHelper.js

export function getNamaBulan(index = null) {
  const bulan = [
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

  if (index !== null) {
    // kalau dikasih index (1–12)
    return bulan[index - 1] || null
  }

  const now = new Date()
  return bulan[now.getMonth()]
}

export function getNomorBulan() {
  const now = new Date()
  return now.getMonth() + 1
}

export function getTahunSekarang() {
  return new Date().getFullYear()
}

export function getTahunBulan() {
  const now = new Date()
  const bulan = String(now.getMonth() + 1).padStart(2, '0')
  const tahun = now.getFullYear()
  return `${tahun}-${bulan}`
}

export function getListBulan() {
  const namaBulan = [
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

  return namaBulan.map((nama, i) => ({
    label: nama,
    value: i + 1,
  }))
}

const formatDouble = (value, dg) => {
  if (value !== null && value !== 0) {
    return Number(value)
      .toFixed(dg)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    // .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
  } else {
    return 0
  }
}
const formatDoubleKoma = (value, dg) => {
  if (value !== null && value !== 0) {
    return Number(value)
      .toFixed(dg)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1')
    // .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
  } else {
    return 0
  }
}

const formattanpaRp = (value) => {
  if (value !== null && value !== '') {
    return (
      Number(value)
        .toFixed(2)
        // titik
        // .replace(/\d(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");

        // koma
        // .replace(/(\d)(?=(\d{3})+\.)/g, '$&,')
        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    )
  }
}

export { formatDouble, formatDoubleKoma, formattanpaRp }
