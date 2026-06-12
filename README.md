# Sistem Klasifikasi Penjualan Skincare C4.5

Project awal untuk skripsi berbasis Python Flask, MySQL, Bootstrap, dan JavaScript.

## Teknologi

- Frontend: HTML, CSS, Bootstrap, JavaScript
- Backend: Python Flask
- Database: MySQL di XAMPP
- Role: Admin dan Staff

## Cara Menyiapkan Database di XAMPP

1. Jalankan Apache dan MySQL dari XAMPP Control Panel.
2. Buka `http://localhost/phpmyadmin`.
3. Pilih menu Import.
4. Import file `database/schema.sql`.
5. Database `db_wahyuni_c45` dan tabel awal akan dibuat otomatis.

## Cara Menjalankan Aplikasi

1. Buat virtual environment:

```bash
python -m venv venv
```

2. Aktifkan virtual environment di PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

3. Install dependency:

```bash
pip install -r requirements.txt
```

4. File `.env` sudah disiapkan untuk MySQL XAMPP default. Sesuaikan `MYSQL_PASSWORD` jika MySQL Anda memakai password.

5. Jalankan aplikasi:

```bash
python app.py
```

6. Buka browser ke `http://127.0.0.1:5000`.

## Akun Awal

- Admin: `admin` / `admin123`
- Staff: `staff` / `staff123`

## Tabel Database

- `users`: data akun dan role pengguna
- `produk`: data produk skincare
- `penjualan`: dataset penjualan produk
- `hasil_klasifikasi`: hasil proses klasifikasi C4.5
