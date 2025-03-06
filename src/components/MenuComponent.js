import React from "react";
import { useNavigate } from "react-router-dom";

const MenuComponent = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Update menu aktif
    if (menu === "home") {
      navigate("/home-profile"); // Arahkan ke halaman Home Profile
    } else if (menu === "isi-kuisoner") {
      navigate("/isi-kuisoner"); // Arahkan ke halaman Isi Kuisoner
    } else if (menu === "profile") {
      navigate("/profile"); // Arahkan ke halaman Profile
    }
  };

  return (
    <div style={styles.menuContainer}>
      {/* Menu Home */}
      <button
        style={{
          ...styles.menuButton,
          backgroundColor: activeMenu === "home" ? "#007bff" : "#f0f0f0",
          color: activeMenu === "home" ? "#fff" : "#333",
        }}
        onClick={() => handleMenuClick("home")}
      >
        Home
      </button>

      {/* Menu Isi Kuisoner */}
      <button
        style={{
          ...styles.menuButton,
          backgroundColor: activeMenu === "isi-kuisoner" ? "#007bff" : "#f0f0f0",
          color: activeMenu === "isi-kuisoner" ? "#fff" : "#333",
        }}
        onClick={() => handleMenuClick("isi-kuisoner")}
      >
        Isi Kuisoner
      </button>

      {/* Menu Profile */}
      <button
        style={{
          ...styles.menuButton,
          backgroundColor: activeMenu === "profile" ? "#007bff" : "#f0f0f0",
          color: activeMenu === "profile" ? "#fff" : "#333",
        }}
        onClick={() => handleMenuClick("profile")}
      >
        Profile
      </button>
    </div>
  );
};

// Styling untuk MenuComponent
const styles = {
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  menuButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s, color 0.3s",
  },
};

export default MenuComponent;
