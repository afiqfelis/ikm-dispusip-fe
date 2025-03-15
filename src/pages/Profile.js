import React, { useState } from "react";
import { motion } from "framer-motion"; // Import dari framer-motion
import MenuComponent from "../components/MenuComponent";

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState("profile"); // State untuk melacak menu aktif

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
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.title}>Halaman Profile</h1>

      {/* Menu */}
      <MenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten Utama */}
      <motion.div
        style={styles.content}
        variants={containerVariants} // Variants untuk animasi
        initial="hidden" // Keadaan awal
        animate="visible" // Keadaan akhir (setelah animasi)
      >
        {/* Profil Singkat DISPUSIP */}
        <div style={styles.profileSection}>
          <h2 style={styles.sectionTitle}>Tentang Kami</h2>
          <p style={styles.profileText}>
            Dinas Perpustakaan dan Kearsipan (DISPUSIP) Kota Pekanbaru merupakan lembaga pemerintah yang bertanggung jawab dalam mengelola perpustakaan umum, arsip, serta dokumen penting milik pemerintah daerah. Kami berkomitmen untuk
            meningkatkan literasi masyarakat, menjaga keberlanjutan pengetahuan, dan memberikan akses informasi yang mudah, cepat, dan terpercaya.
          </p>

          <h3 style={styles.subtitle}>Visi</h3>
          <p style={styles.profileText}>Menjadi pusat informasi dan pengetahuan yang andal untuk mendukung pembangunan masyarakat yang cerdas, inklusif, dan berkelanjutan.</p>

          <h3 style={styles.subtitle}>Misi</h3>
          <ul style={styles.list}>
            <li>Menyediakan layanan perpustakaan dan kearsipan yang modern dan inovatif.</li>
            <li>Meningkatkan minat baca dan literasi masyarakat melalui program-program edukasi.</li>
            <li>Menjaga kelestarian arsip sebagai warisan budaya dan sejarah daerah.</li>
            <li>Mengembangkan sistem digitalisasi untuk mempermudah akses informasi.</li>
          </ul>

          <h3 style={styles.subtitle}>Program Unggulan</h3>
          <ul style={styles.list}>
            <li>
              <strong>Gerakan Literasi Masyarakat:</strong> Mengadakan kampanye membaca di sekolah-sekolah, komunitas, dan ruang publik.
            </li>
            <li>
              <strong>Perpustakaan Digital:</strong> Menyediakan koleksi buku elektronik yang dapat diakses secara online.
            </li>
            <li>
              <strong>Pendidikan Arsip:</strong> Memberikan pelatihan kepada aparatur pemerintah dan masyarakat tentang pengelolaan arsip.
            </li>
            <li>
              <strong>Ruang Baca Publik:</strong> Menyediakan fasilitas baca yang nyaman dan ramah lingkungan.
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Container Box dengan Efek Hover */}
      <div style={styles.boxOuterContainer}>
        <div style={styles.boxContainer}>
          {/* Box 1 */}
          <BoxWithHover icon="📚" text="Kunjungi Websites Resmi DISPUSIP" link="https://example.com/survey" linkText="Kunjungi Kami" />
        </div>
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

// Styling untuk Halaman Profile
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "60px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "80px",
  },
  content: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minHeight: "300px",
  },
  profileSection: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
    marginTop: "20px",
    marginBottom: "10px",
  },
  profileText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "20px",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
  },
  boxOuterContainer: {
    display: "flex",
    justifyContent: "center", // Pusatkan container box secara horizontal
    marginTop: "40px", // Jarak dari konten sebelumnya
    padding: "40px",
    backgroundColor: "#f9f9f9", // Warna latar belakang container box
  },
  boxContainer: {
    display: "flex",
    justifyContent: "center", // Pusatkan box secara horizontal
    gap: "30px", // Jarak antar box
  },
  box: {
    backgroundColor: "#fff", // Warna latar putih
    padding: "40px",
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

export default Profile;
