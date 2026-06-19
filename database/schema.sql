CREATE DATABASE IF NOT EXISTS db_wahyuni_c45
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE db_wahyuni_c45;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'owner') NOT NULL DEFAULT 'owner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_produk VARCHAR(30) NULL UNIQUE,
    nama_produk VARCHAR(150) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    harga DECIMAL(12,2) NOT NULL DEFAULT 0,
    stok INT NOT NULL DEFAULT 0,
    satuan VARCHAR(30) NOT NULL DEFAULT 'pcs',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS penjualan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produk_id INT NOT NULL,
    tanggal_penjualan DATE NULL,
    bulan VARCHAR(20) NOT NULL,
    tahun YEAR NOT NULL,
    jumlah_terjual INT NOT NULL DEFAULT 0,
    total_penjualan DECIMAL(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_penjualan_produk
        FOREIGN KEY (produk_id) REFERENCES produk(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS hasil_klasifikasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produk_id INT NULL,
    kode_produk VARCHAR(30) NULL,
    nama_produk VARCHAR(150) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    tanggal_awal DATE NOT NULL,
    tanggal_akhir DATE NOT NULL,
    bulan VARCHAR(20) NOT NULL,
    tahun YEAR NOT NULL,
    jumlah_terjual INT NOT NULL DEFAULT 0,
    total_penjualan DECIMAL(12,2) NOT NULL DEFAULT 0,
    rata_rata_penjualan DECIMAL(12,2) NOT NULL DEFAULT 0,
    hasil_klasifikasi VARCHAR(50) NOT NULL,
    keterangan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_hasil_produk
        FOREIGN KEY (produk_id) REFERENCES produk(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

INSERT INTO users (nama, username, password, role)
VALUES
('Administrator', 'admin', 'scrypt:32768:8:1$wRNdk9lspkvz9hP9$2ba1080a5c034cd1d3316b42cf55f6ee8eb01848d2c036bca0842e7facf95fc64923dfc64f8a6e11efe484b78bd4c73cdb66d259e229e563571d1307e24500f3', 'admin'),
('Owner Toko', 'owner', 'scrypt:32768:8:1$qgDnPsOKq79WE24U$315f7f6e287119b45cbcd6d4061b55bb4db8decf0bd908464f57c6a508306731c71185bee8ad9caff90e573ca798063334b933532e2f058fd173f5e40b82a686', 'owner')
ON DUPLICATE KEY UPDATE username = VALUES(username);

INSERT INTO produk (kode_produk, nama_produk, kategori, harga, stok, satuan)
VALUES
('PRD001', 'Facial Wash SR12', 'Facial Wash', 35000, 50, 'pcs'),
('PRD002', 'Serum Brightening SR12', 'Serum', 75000, 30, 'pcs'),
('PRD003', 'Day Cream SR12', 'Cream', 65000, 40, 'pcs')
ON DUPLICATE KEY UPDATE nama_produk = VALUES(nama_produk);
