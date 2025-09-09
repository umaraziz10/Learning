# Weather App Indonesia

Aplikasi cuaca sederhana untuk menampilkan informasi cuaca kota-kota di Indonesia.

## Fitur

- **Pencarian Kota**: Masukkan nama kota di Indonesia untuk mendapatkan informasi cuaca
- **Data Cuaca Lengkap**: Menampilkan informasi cuaca yang krusial seperti:
  - Suhu saat ini dan rentang suhu harian
  - Kelembaban udara
  - Kecepatan angin
  - Jarak pandang
  - Tekanan udara
  - Indeks UV
  - Curah hujan
  - Waktu matahari terbit dan terbenam
- **Tampilan Responsif**: Desain yang menyesuaikan dengan berbagai ukuran layar
- **UI Modern**: Menggunakan Tailwind CSS dan shadcn/ui components

## Teknologi yang Digunakan

- **React 18**: Framework JavaScript untuk membangun user interface
- **Vite**: Build tool yang cepat untuk development
- **Tailwind CSS**: Framework CSS untuk styling
- **shadcn/ui**: Komponen UI yang modern dan accessible
- **Lucide React**: Icon library

## Struktur Data API

Aplikasi ini dirancang untuk bekerja dengan data API yang memiliki struktur seperti berikut:

```json
{
  "data": {
    "resolvedAddress": "nama_kota",
    "timezone": "Asia/Jakarta",
    "currentConditions": {
      "temp": 74.7,
      "feelslike": 74.7,
      "humidity": 97.62,
      "windspeed": 1.6,
      "visibility": 11.5,
      "pressure": 1013,
      "uvindex": 1,
      "precip": 0.063,
      "conditions": "Rain, Overcast",
      "icon": "rain",
      "sunrise": "06:00:37",
      "sunset": "18:06:04"
    },
    "days": [
      {
        "tempmax": 83.2,
        "tempmin": 72.9
      }
    ]
  }
}
```

## Instalasi dan Menjalankan

1. **Install dependencies**:
   ```bash
   npm install
   # atau
   pnpm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   # atau
   pnpm run dev
   ```

3. **Buka browser** dan akses `http://localhost:5173`

## Integrasi dengan Backend

Untuk mengintegrasikan dengan backend API Anda:

1. **Buka file `src/App.jsx`**
2. **Temukan fungsi `handleSearch`**
3. **Ganti bagian mock data** dengan API call ke backend Anda:

```javascript
const handleSearch = async (cityName) => {
  setLoading(true)
  setError(null)
  
  try {
    // Ganti dengan endpoint API Anda
    const response = await fetch(`/api/weather/${cityName}`)
    const data = await response.json()
    
    setWeatherData(data)
  } catch (err) {
    setError('Gagal mengambil data cuaca. Silakan coba lagi.')
  } finally {
    setLoading(false)
  }
}
```

## Komponen Utama

### SearchBar
Komponen untuk input pencarian kota dengan tombol search.

### WeatherDisplay
Komponen utama untuk menampilkan data cuaca dalam format yang mudah dibaca, termasuk:
- Card utama dengan suhu dan kondisi cuaca
- Grid detail cuaca (kelembaban, angin, dll.)
- Informasi matahari terbit/terbenam

## Customization

### Mengubah Styling
- Edit file `src/App.css` untuk styling global
- Komponen menggunakan Tailwind CSS classes yang dapat disesuaikan

### Menambah Data Cuaca
- Edit komponen `WeatherDisplay.jsx` untuk menambah field data cuaca baru
- Sesuaikan dengan struktur data dari API backend Anda

## Build untuk Production

```bash
npm run build
# atau
pnpm run build
```

File hasil build akan tersimpan di folder `dist/` dan siap untuk di-deploy.

## Catatan

- Aplikasi saat ini menggunakan mock data untuk demonstrasi
- Konversi suhu dari Fahrenheit ke Celsius dilakukan otomatis
- Desain responsif mendukung desktop dan mobile
- Semua ikon menggunakan Lucide React icons

