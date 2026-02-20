# The Fox & The Winter Moon

Ringkasan  
Proyek web interaktif sederhana menampilkan model 3D (model-viewer), efek bintang & salju, dan animasi halaman. Dibangun dengan HTML, CSS (Tailwind), dan JavaScript.

Fitur utama
- Model 3D menggunakan <model-viewer>
- Preloader dan status muat
- Efek bintang berkelip dan salju halus
- Scroll reveal animasi
- Parallax ringan untuk model 3D

Cara menjalankan (lokal)
1. Pastikan struktur file utuh, terutama `assets/models/Untitled.glb`.
2. Jalankan server lokal (disarankan), contoh:
   - Python 3: `python -m http.server 8000`
   - VSCode: gunakan extension Live Server
3. Buka http://localhost:8000 di browser.

Debugging 3D tidak muncul
- Buka DevTools → Console: lihat error.
- Buka DevTools → Network: cari `assets/models/Untitled.glb` → harus mengembalikan HTTP 200.
- Jika 404: perbaiki path atau letakkan file model di `assets/models/`.
- CORS: jika model dimuat dari domain lain, pastikan header CORS di server asset.
- model-viewer events: script sudah mendengarkan `progress`, `load`, `error` — perhatikan badge status di pojok kiri bawah dan pesan overlay error.
- Jika cameraOrbit tidak bereaksi: pastikan elemen `#model-wrapper` dan `#fox-3d` ada dan model-viewer versi kompatibel.

File penting
- index.html — markup, model-viewer, link ke skrip & CSS
- css/input.css — gaya efek bintang, salju, reveal
- js/script.js — preloader, efek visual, status badge, scroll reveal
- js/three-setup.js — parallax pointer untuk model-viewer
- assets/models/Untitled.glb — model 3D (pastikan ada)

Tips pengembangan
- Jalankan lewat server lokal, jangan buka file langsung (file://).
- Gunakan Network tab untuk memverifikasi asset.
- Untuk debugging, set `console.log` di event `model-viewer` atau aktifkan overlay error di `script.js`.

Lisensi
MIT — bebas digunakan dan dimodifikasi.

