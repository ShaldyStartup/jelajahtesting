# Jelajah Travel

Frontend prototype travel agent berbahasa Indonesia. Dibangun dengan HTML, CSS, dan JavaScript tanpa build step.

## Menjalankan

Jika Apache XAMPP aktif, buka `http://localhost/travelweb/index.html`. Anda juga dapat membuka `index.html` langsung dari folder ini. Alternatif lain: jalankan `node server.cjs` lalu buka `http://127.0.0.1:4173/`.

## Demo

- Cari paket dari beranda, pilih jadwal, lalu lanjutkan ke booking. Akun demo menerima email valid dan password minimal 8 karakter; password tidak disimpan.
- Pembayaran memakai instruksi dan unggahan bukti demo. Tidak ada transfer uang atau payment gateway.
- Akses panel admin melalui tautan **Admin demo** di footer atau `#/admin`. Verifikasi di sana memperbarui status booking pada My Trip.
- Data paket, booking, wishlist, ulasan, dan sesi demo tersimpan di `localStorage` browser.
- Foto dan font memakai URL eksternal, sehingga memerlukan koneksi internet.

Data admin awal berisi lima booking contoh. Semua nama, nomor rekening, kontak, dan promo adalah konten demo.
