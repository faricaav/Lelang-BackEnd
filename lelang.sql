-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2022 at 02:52 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lelang`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `nama_barang` varchar(255) DEFAULT NULL,
  `tgl_daftar` datetime DEFAULT NULL,
  `harga_awal` int(11) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `tgl_daftar`, `harga_awal`, `deskripsi`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Jam Tangan Rolex', '2022-09-21 00:00:00', 1000, 'Rolex edisi YU76 ', 'img-1663730023119.jpg', '2022-09-20 20:13:43', '2022-09-20 20:13:43'),
(4, 'iPhone 12', '2022-09-27 00:00:00', 1000, '128GB, Warna Blue, Battery Health 98%, 2021', 'img-1664288075356.jpg', '2022-09-27 07:14:35', '2022-09-27 07:14:35'),
(7, 'Laptop ASUS ROG', '2022-11-02 00:00:00', 2000, 'Laptop ASUS ROG Strix G17', 'img-1667356762559.jpg', '2022-11-01 19:38:09', '2022-11-01 19:39:43');

-- --------------------------------------------------------

--
-- Table structure for table `history_lelang`
--

CREATE TABLE `history_lelang` (
  `id_history` int(11) NOT NULL,
  `id_lelang` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_masyarakat` int(11) NOT NULL,
  `penawaran_harga` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history_lelang`
--

INSERT INTO `history_lelang` (`id_history`, `id_lelang`, `id_barang`, `id_masyarakat`, `penawaran_harga`, `createdAt`, `updatedAt`) VALUES
(18, 25, 7, 1, 3000, '2022-12-09 08:02:26', '2022-12-09 08:02:26'),
(19, 25, 7, 1, 4000, '2022-12-10 01:01:55', '2022-12-10 01:01:55'),
(21, 40, 4, 3, 4000, '2022-12-11 08:01:02', '2022-12-11 08:01:02');

-- --------------------------------------------------------

--
-- Table structure for table `lelang`
--

CREATE TABLE `lelang` (
  `id_lelang` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `tgl_lelang` datetime DEFAULT NULL,
  `harga_akhir` int(11) DEFAULT NULL,
  `id_petugas` int(11) NOT NULL,
  `status` enum('Buka','Tutup') DEFAULT NULL,
  `id_masyarakat` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lelang`
--

INSERT INTO `lelang` (`id_lelang`, `id_barang`, `tgl_lelang`, `harga_akhir`, `id_petugas`, `status`, `id_masyarakat`, `createdAt`, `updatedAt`) VALUES
(25, 7, '2022-12-09 21:58:08', 4000, 1, 'Buka', 1, '2022-12-09 07:50:03', '2022-12-10 01:01:55'),
(26, 7, '2022-12-09 21:52:44', 2000, 1, 'Tutup', 3, '2022-12-09 07:52:44', '2022-12-09 07:52:45'),
(39, 7, '2022-12-11 21:52:45', 2000, 1, 'Tutup', NULL, '2022-12-10 08:43:16', '2022-12-11 14:52:45'),
(40, 4, '2022-12-11 22:00:02', 4000, 1, 'Buka', 3, '2022-12-11 15:00:02', '2022-12-11 15:01:02');

-- --------------------------------------------------------

--
-- Table structure for table `masyarakat`
--

CREATE TABLE `masyarakat` (
  `id_masyarakat` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tlp` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `masyarakat`
--

INSERT INTO `masyarakat` (`id_masyarakat`, `nama`, `username`, `password`, `tlp`, `createdAt`, `updatedAt`) VALUES
(1, 'Dinda Nola', 'masyarakat1', '827ccb0eea8a706c4c34a16891f84e7b', '08123456789', '2022-09-20 00:46:20', '2022-09-20 00:46:20'),
(3, 'Vania Arya', 'masyarakat2', '827ccb0eea8a706c4c34a16891f84e7b', '081298765432', '2022-09-26 22:08:21', '2022-09-26 22:08:21'),
(4, 'Adinda Maulidya', 'masyarakat3', '827ccb0eea8a706c4c34a16891f84e7b', '081122334455', '2022-09-26 22:09:33', '2022-09-26 22:09:33'),
(6, 'Fadhilah Putri', 'masyarakat4', '827ccb0eea8a706c4c34a16891f84e7b', '081235791357', '2022-09-26 22:13:53', '2022-09-26 22:13:53');

-- --------------------------------------------------------

--
-- Table structure for table `petugas`
--

CREATE TABLE `petugas` (
  `id_petugas` int(11) NOT NULL,
  `nama_petugas` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` enum('Admin','Petugas') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `petugas`
--

INSERT INTO `petugas` (`id_petugas`, `nama_petugas`, `username`, `password`, `level`, `createdAt`, `updatedAt`) VALUES
(1, 'Farica Vashti', 'adminlelang', '827ccb0eea8a706c4c34a16891f84e7b', 'Petugas', '2022-09-19 23:18:09', '2022-09-19 23:19:08');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220920054344-create-barang.js'),
('20220920054448-create-masyarakat.js'),
('20220920054540-create-petugas.js'),
('20220920054631-create-lelang.js'),
('20220920054717-create-history-lelang.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `history_lelang`
--
ALTER TABLE `history_lelang`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `id_barang` (`id_barang`),
  ADD KEY `id_masyarakat` (`id_masyarakat`),
  ADD KEY `history_lelang_ibfk_1` (`id_lelang`);

--
-- Indexes for table `lelang`
--
ALTER TABLE `lelang`
  ADD PRIMARY KEY (`id_lelang`),
  ADD KEY `id_petugas` (`id_petugas`),
  ADD KEY `lelang_ibfk_3` (`id_masyarakat`),
  ADD KEY `lelang_ibfk_1` (`id_barang`);

--
-- Indexes for table `masyarakat`
--
ALTER TABLE `masyarakat`
  ADD PRIMARY KEY (`id_masyarakat`);

--
-- Indexes for table `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`id_petugas`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `history_lelang`
--
ALTER TABLE `history_lelang`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `lelang`
--
ALTER TABLE `lelang`
  MODIFY `id_lelang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `masyarakat`
--
ALTER TABLE `masyarakat`
  MODIFY `id_masyarakat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id_petugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history_lelang`
--
ALTER TABLE `history_lelang`
  ADD CONSTRAINT `history_lelang_ibfk_1` FOREIGN KEY (`id_lelang`) REFERENCES `lelang` (`id_lelang`) ON DELETE CASCADE,
  ADD CONSTRAINT `history_lelang_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`),
  ADD CONSTRAINT `history_lelang_ibfk_3` FOREIGN KEY (`id_masyarakat`) REFERENCES `masyarakat` (`id_masyarakat`);

--
-- Constraints for table `lelang`
--
ALTER TABLE `lelang`
  ADD CONSTRAINT `lelang_ibfk_1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE CASCADE,
  ADD CONSTRAINT `lelang_ibfk_2` FOREIGN KEY (`id_petugas`) REFERENCES `petugas` (`id_petugas`),
  ADD CONSTRAINT `lelang_ibfk_3` FOREIGN KEY (`id_masyarakat`) REFERENCES `masyarakat` (`id_masyarakat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
