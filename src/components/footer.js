import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Bagian Utama Footer */}
      <div style={styles.mainFooter}>
        {/* Bagian Kiri: Logo dan Deskripsi */}
        <div style={styles.leftSection}>
          <img
            src="/assets/kudata_logotype-BkpGKRkG.png" // Ganti dengan path gambar Anda
            alt="logo"
            style={styles.logo}
          />
          <p style={styles.subtitle}>Perpustakaan Terbaik di Kota Pekanbaru</p>
          <p style={styles.description}>
            Perpustakaan Umum Kota Pekanbaru menyediakan layanan peminjaman, pengembalian, perpanjangan koleksi, pembacaan di tempat, serta akses ruang kreativitas anak untuk anggota, instansi berbasis MoU, dan pemustaka umum.
          </p>
        </div>

        {/* Bagian Tengah: Navigasi */}
        <div style={styles.middleSection}>
          <h1 style={styles.heading}>DISPUSIP</h1>
          <p style={styles.link}>Tentang Kami</p>
          <a href="#" style={styles.link}>
            Syarat dan Ketentuan
          </a>
          <a href="#" style={styles.link}>
            Kebijakan Privasi
          </a>
        </div>

        {/* Bagian Kanan: Kontak */}
        <div style={styles.rightSection}>
          <h1 style={styles.heading}>Hubungi Kami</h1>
          <p style={styles.contactText}>Alamat: Jl. Jenderal Sudirman No. XXX, Kota Pekanbaru, Riau</p>
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

      {/* Hak Cipta */}
      <div style={styles.copyright}>
        <p style={styles.copyrightText}>© 2025 DISPUSIP. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Styling untuk Footer
const styles = {
  footer: {
    display: "flex",
    flexDirection: "column", // Susun elemen secara vertikal
    backgroundColor: "#fff",
    color: "#17202a",
    padding: "20px 40px",
    borderTop: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  mainFooter: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "20px", // Jarak antara konten utama dan hak cipta
  },
  leftSection: {
    flex: "1 1 30%", // Lebar bagian kiri
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logo: {
    width: "150px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
  },
  middleSection: {
    flex: "1 1 20%", // Lebar bagian tengah
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  rightSection: {
    flex: "1 1 30%", // Lebar bagian kanan
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  link: {
    fontSize: "14px",
    color: "#17202a",
    marginBottom: "10px",
    cursor: "pointer",
    textDecoration: "none",
  },
  contactText: {
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
  copyright: {
    borderTop: "1px solid #ccc", // Garis tipis di atas hak cipta
    paddingTop: "10px", // Jarak dari garis ke teks hak cipta
    textAlign: "center", // Pusatkan teks hak cipta
  },
  copyrightText: {
    margin: 0,
    fontSize: "14px",
    color: "#555",
  },
};

export default Footer;
