import React, { useState } from "react";
import { motion } from "framer-motion"; // Import dari framer-motion
import MenuComponent from "../components/MenuComponent"; // Impor MenuComponent

const HomeProfile = () => {
  const [activeMenu, setActiveMenu] = useState("home"); // State untuk melacak menu aktif

  // Variants untuk animasi container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 }, // Awal: transparan dan sedikit ke bawah
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }, // Transisi: durasi 0.8 detik
    },
  };

  return (
    <div className="home-profile-container" style={{ ...styles.container }}>
      {/* Header */}
      <h1 style={styles.title}>Selamat Datang di Website Resmi Dinas Perpustakaan dan Kearsipan Kota Pekanbaru</h1>

      {/* Menu */}
      <MenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten Berdasarkan Menu Aktif */}
      <motion.div
        style={styles.content}
        variants={containerVariants} // Variants untuk animasi
        initial="hidden" // Keadaan awal
        animate="visible" // Keadaan akhir (setelah animasi)
      >
        {activeMenu === "home" && (
          <div>
            {/* Kata Sambutan */}
            <p style={styles.paragraph}>
              Kami dengan hormat menyampaikan apresiasi kepada seluruh pengunjung atas kunjungan Anda di website resmi kami. Website ini dirancang untuk menampung aspirasi, masukan, serta penilaian kepuasan masyarakat terhadap layanan yang
              kami berikan. Melalui platform ini, kami berharap dapat meningkatkan kualitas pelayanan publik di bidang perpustakaan dan kearsipan demi mendukung visi Kota Pekanbaru sebagai Smart City Madani.
            </p>
          </div>
        )}
      </motion.div>

      {/* 3 Box Container */}
      <div style={styles.boxContainer}>
        {/* Box 1 */}
        <BoxWithHover icon="📚" text="Platform Survey #1 untuk Mahasiswa Indonesia" link="https://example.com/survey" linkText="Gabung Komunitas Kudata" />

        {/* Box 2 */}
        <BoxWithHover icon="👥" text="Temukan topik survey yang menarik bagimu" link="https://example.com/community" linkText="Follow Instagram Kudata" />

        {/* Box 3 */}
        <BoxWithHover icon="🎁" text="Dapatkan hadiah yang pasti hanya pada platform Kudata!" link="https://example.com/rewards" linkText="Pelajari Lebih Lanjut" />
      </div>
    </div>
  );
};

// Komponen Box dengan Efek Hover
const BoxWithHover = ({ icon, text, link, linkText }) => {
  const [isHovered, setIsHovered] = useState(false); // State untuk hover

  return (
    <div
      style={{
        ...styles.box,
        ...(isHovered && styles.boxHover), // Terapkan gaya hover jika isHovered true
      }}
      onMouseEnter={() => setIsHovered(true)} // Aktifkan hover saat mouse masuk
      onMouseLeave={() => setIsHovered(false)} // Nonaktifkan hover saat mouse keluar
    >
      <span style={styles.boxIcon}>{icon}</span>
      <p style={styles.boxText}>{text}</p>
      <a href={link} style={styles.boxLink}>
        {linkText}
      </a>
    </div>
  );
};

// Styling untuk Halaman HomeProfile
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "60px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundSize: "cover", // Gambar latar belakang menutupi seluruh area
    backgroundPosition: "center", // Gambar diposisikan di tengah
    backgroundRepeat: "no-repeat", // Gambar tidak diulang
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "80px",
    color: "#333",
  },
  content: {
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Tambahkan transparansi agar gambar latar terlihat samar
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minHeight: "300px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "center", // Pusatkan box secara horizontal
    gap: "30px", // Jarak antar box
    marginTop: "150px", // Jarak dari konten sebelumnya
  },
  box: {
    backgroundColor: "#fff", // Warna latar putih
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Efek bayangan
    textAlign: "center",
    width: "300px", // Lebar box
    transition: "transform 0.3s, background-color 0.3s", // Animasi hover untuk transform dan warna latar
    cursor: "pointer",
  },
  boxHover: {
    transform: "scale(1.05)", // Efek zoom saat hover
    backgroundColor: "#e3f2fd", // Warna biru muda saat hover
  },
  boxIcon: {
    fontSize: "40px",
    color: "#007bff", // Warna ikon biru
    marginBottom: "15px",
  },
  boxText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
  },
  boxLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "color 0.3s", // Animasi hover untuk link
  },
};

export default HomeProfile;
