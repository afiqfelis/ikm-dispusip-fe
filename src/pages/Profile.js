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

      {/* Konten */}
      <motion.div
        style={styles.content}
        variants={containerVariants} // Variants untuk animasi
        initial="hidden" // Keadaan awal
        animate="visible" // Keadaan akhir (setelah animasi)
      >
        <h2>Profile</h2>
        <p>Ini adalah halaman profile Anda.</p>
      </motion.div>
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
};

export default Profile;
