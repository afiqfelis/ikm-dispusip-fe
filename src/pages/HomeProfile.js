import React, { useState } from "react";
import MenuComponent from "../components/MenuComponent"; // Impor MenuComponent


const HomeProfile = () => {
  const [activeMenu, setActiveMenu] = useState("home"); // State untuk melacak menu aktif

  return (
    <div className="home-profile-container" style={styles.container}>

      {/* Header */}
      <h1 style={styles.title}>Selamat Datang di Website Resmi Dinas Perpustakaan dan Kearsipan Kota Pekanbaru</h1>

      {/* Menu */}
      <MenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten Berdasarkan Menu Aktif */}
      <div style={styles.content}>
        {activeMenu === "home" && (
          <div>
            {/* Kata Sambutan */}
            <p style={styles.paragraph}>
              Kami dengan hormat menyampaikan apresiasi kepada seluruh pengunjung atas kunjungan Anda di website resmi kami. Website ini dirancang untuk menampung aspirasi, masukan, serta penilaian kepuasan masyarakat terhadap layanan yang
              kami berikan. Melalui platform ini, kami berharap dapat meningkatkan kualitas pelayanan publik di bidang perpustakaan dan kearsipan demi mendukung visi Kota Pekanbaru sebagai Smart City Madani.
            </p>

            {/* Identitas */}
            <div style={styles.identitySection}>
              <h2 style={styles.identityTitle}>Tetap Terhubung Dengan Kami</h2>
              <p style={styles.identityText}>
                <strong>DISPUSIP:</strong> Dinas Perpustakaan dan Kearsipan Kota Pekanbaru
              </p>
              <p style={styles.identityText}>Alamat: Jl. Jenderal Sudirman No. XXX, Kota Pekanbaru, Riau</p>
              <div style={styles.socialMedia}>
                <a href="https://x.com" style={styles.socialIcon}>
                  𝕏
                </a>
                <a href="https://facebook.com" style={styles.socialIcon}>
                  Facebook
                </a>
                <a href="https://youtube.com" style={styles.socialIcon}>
                  YouTube
                </a>
                <a href="https://instagram.com" style={styles.socialIcon}>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
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
    backgroundColor: "#fff",
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
  identitySection: {
    marginTop: "40px",
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  },
  identityTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  identityText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  socialMedia: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  socialIcon: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default HomeProfile;
