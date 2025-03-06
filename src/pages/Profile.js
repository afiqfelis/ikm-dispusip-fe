import React, { useState } from "react";
import MenuComponent from "../components/MenuComponent";

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState("profile"); // State untuk melacak menu aktif

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.title}>Halaman Profile</h1>

      {/* Menu */}
      <MenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten */}
      <div style={styles.content}>
        <h2>Profile</h2>
        <p>Ini adalah halaman profile Anda.</p>
      </div>
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
