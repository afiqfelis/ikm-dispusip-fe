import React, { useState } from "react";
import { motion } from "framer-motion"; // Import dari framer-motion
import MenuComponent from "../components/MenuComponent"; // Impor MenuComponent
// Import Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

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
            {/* Teks Pengenalan IKM Survey */}
            <div style={styles.surveySection}>
              <h2 style={styles.subtitle}>Selamat Datang di Platform IKM Survey</h2>
              <p style={styles.surveyText}>Halo, Sahabat Literasi!</p>
              <p style={styles.surveyText}>
                Selamat datang di <strong>IKM Survey</strong>, platform resmi milik <strong>Dinas Perpustakaan dan Kearsipan (DISPUSIP) Kota Pekanbaru</strong>. Kami dengan bangga mempersembahkan wadah ini sebagai sarana untuk mendengarkan
                suara Anda, masyarakat, dalam menilai kualitas layanan kami.
              </p>
              <p style={styles.surveyText}>
                <strong>Apa itu IKM Survey?</strong>
                IKM Survey adalah survei Indeks Kepuasan Masyarakat yang bertujuan untuk mengukur tingkat kepuasan Anda terhadap layanan yang kami sediakan. Melalui survei ini, kami berharap dapat mengumpulkan masukan berharga dari Anda
                untuk terus meningkatkan pelayanan publik di bidang perpustakaan dan kearsipan.
              </p>
              <p style={styles.surveyText}>
                <strong>Mengapa Partisipasi Anda Penting?</strong>
                Setiap pendapat dan saran dari Anda sangat berarti bagi kami. Dengan meluangkan waktu beberapa menit untuk mengisi survei ini, Anda turut berkontribusi dalam mewujudkan layanan yang lebih baik, lebih cepat, dan lebih nyaman
                bagi seluruh masyarakat Kota Pekanbaru.
              </p>
              <p style={styles.surveyText}>
                <strong>Bagaimana Cara Mengisi Survei?</strong>
              </p>
              <ol style={styles.surveyList}>
                <li>Pilih menu "Isi Kuisioner" di atas.</li>
                <li>Jawab pertanyaan-pertanyaan yang diberikan sesuai dengan pengalaman Anda.</li>
                <li>Kirimkan jawaban Anda, dan selesai!</li>
              </ol>
              <p style={styles.surveyText}>Jangan khawatir, semua data yang Anda berikan akan dijaga kerahasiaannya dan hanya digunakan untuk keperluan peningkatan layanan.</p>
              <p style={styles.surveyText}>
                <strong>Yuk, Bersama Kita Wujudkan Layanan Publik yang Lebih Baik!</strong>
                Mari bersama-sama mendukung transformasi digital DISPUSIP Kota Pekanbaru menuju <strong>Smart City Madani</strong>. Setiap suara Anda adalah langkah penting bagi kemajuan literasi, arsip, dan informasi di Kota Pekanbaru.
              </p>
              <p style={styles.surveyText}>Terima kasih atas partisipasi Anda. Mari kita bangun masa depan yang lebih cerdas, inklusif, dan berkelanjutan!</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* 3 Box Container */}
      <div style={styles.boxContainer}>
        {/* Box 1: Website Resmi */}
        <BoxWithHover icon={<FontAwesomeIcon icon={faGlobe} />} text="Kunjungi Website Resmi" link="https://dispusip.pekanbaru.go.id/" linkText="Website Resmi" />

        {/* Box 2: Instagram */}
        <BoxWithHover icon={<FontAwesomeIcon icon={faInstagram} />} text="Follow Instagram Kami" link="https://www.instagram.com/dispusippku/" linkText="Instagram" />

        {/* Box 3: Tentang Kami */}
        <BoxWithHover icon={<FontAwesomeIcon icon={faInfoCircle} />} text="Pelajari Lebih Lanjut Tentang Kami" link="https://example.com/about" linkText="Tentang Kami" />
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
  surveySection: {
    marginTop: "40px",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  surveyText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "10px",
  },
  surveyList: {
    paddingLeft: "20px",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
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
