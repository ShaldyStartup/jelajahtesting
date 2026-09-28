# Jelajah Travel

Prototype travel agent berbahasa Indonesia, dibuat dengan HTML, CSS, dan JavaScript biasa. Tidak ada build step atau dependency npm.

## Run with Node

Jalankan dari folder proyek:

```powershell
npm start
```

Buka `http://127.0.0.1:4173/`. Port dapat diganti melalui variabel lingkungan `PORT`.

## Run with XAMPP

Salin folder proyek ke `C:\xampp\htdocs\jelajah\`, mulai Apache di XAMPP, lalu buka `http://localhost/jelajah/`. Jika memakai lokasi folder proyek ini, buka `http://localhost/travelweb/`. Semua CSS, JS, dan navigasi memakai path relatif atau hash route, sehingga situs juga dapat disajikan dari subfolder lain tanpa Node.

## Struktur

- `index.html`: dokumen awal dan stylesheet.
- `styles.css`, `pages.css`, `responsive.css`, `polish.css`: tampilan dasar, halaman, responsif, dan polesan visual.
- `js/data.js`: destinasi, paket, promo, ulasan, dan booking contoh.
- `js/app.js`: route, antarmuka, interaksi, dan data prototype.
- `server.cjs`: server file statis untuk `npm start`.

## Data demo dan batasan

- Cari paket, pilih jadwal, lalu lanjutkan ke booking. Masuk dengan `aina@example.com` dan password apa saja minimal 8 karakter untuk melihat perjalanan contoh. Email lain membuat akun demo baru; password tidak disimpan.
- Paket, booking, wishlist, promo, ulasan, dan sesi disimpan di `localStorage`. Bukti pembayaran yang diunggah disimpan di IndexedDB agar admin dapat mengunduhnya setelah halaman dimuat ulang. Data hanya ada pada browser dan origin yang sama; Node dan Apache memiliki penyimpanan terpisah.
- Pembayaran dan login adalah simulasi. Tidak ada gateway, transfer dana, pengiriman pesan, atau autentikasi server. Panel admin adalah demo yang dapat dibuka dari footer.
- Lima booking awal adalah data contoh. Nama, kontak, rekening, dan kode promo adalah data demo. Bukti pembayaran contoh hanya berupa nama file, sehingga berkas contohnya tidak dapat diunduh.
- Foto Unsplash dan font Google memerlukan koneksi internet. Jika penyimpanan browser dinonaktifkan, fitur persistensi tidak tersedia.
