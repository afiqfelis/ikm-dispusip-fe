import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate

const LoginNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dropdown
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    console.log("Clicked outside:", event.target);
    const dropdownContainer = document.querySelector(".dropdown-container");
    const homeButton = document.querySelector(".home-button");

    if (
      dropdownContainer &&
      !dropdownContainer.contains(event.target) && // Klik di luar dropdown
      (!homeButton || !homeButton.contains(event.target)) // Klik bukan pada tombol Home
    ) {
      console.log("Closing dropdown...");
      setIsOpen(false); // Tutup dropdown
    }
  };

  // Tambahkan event listener saat komponen dimuat
  document.addEventListener("mousedown", handleClickOutside);

  // Bersihkan event listener saat komponen dibongkar
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <nav style={styles.loginNavbar}>
      {/* Judul Navbar */}
      <h2 style={styles.title}>DISPUSIP</h2>

      {/* Dropdown Menu */}
      <div className="dropdown-container" style={styles.dropdownContainer}>
        <button style={styles.dropdownButton} onClick={toggleDropdown}>
          Menu
          <span style={styles.arrowIcon}>{isOpen ? "▲" : "▼"}</span>
        </button>

        {/* Dropdown Items */}
        {isOpen && (
          <ul style={styles.dropdownMenu}>
            {/* Sub-menu Home */}
            <li style={styles.dropdownItem}>
              <button
                className="dropdown-item-button home-button"
                style={styles.dropdownItemButton}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/home-profile");
                }}
              >
                Home
              </button>
            </li>
            {/* Sub-menu Login */}
            <li style={styles.dropdownItem}>
              <button
                className="dropdown-item-button"
                style={styles.dropdownItemButton}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/login");
                }}
              >
                Login
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

// Styling untuk LoginNavbar
const styles = {
  loginNavbar: {
    display: "flex",
    justifyContent: "space-between", // Pindahkan konten ke ujung kanan
    alignItems: "center",
    backgroundColor: "#2c3e50", // Warna latar belakang biru tua
    color: "#fff",
    padding: "1px 15px", // Padding lebih besar
    position: "fixed",
    top: 0,
    left: 0, // Full-width tanpa sidebar
    width: "100%", // Full-width
    zIndex: 1000,
    margin: 0,
    fontSize: "20px", // Ukuran font lebih besar
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    border: "none",
    color: "#ecf0f1",
    cursor: "pointer",
    fontSize: "16px",
    padding: "8px 22px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  arrowIcon: {
    marginLeft: "8px",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%", // Letakkan dropdown tepat di bawah tombol
    right: "30px", // Geser dropdown menu ke kanan
    marginTop: "10px",
    backgroundColor: "#34495e",
    color: "#fff",
    listStyle: "none",
    padding: "8px 20px",
    margin: 5,
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minWidth: "100px",
    zIndex: 1001,
  },
  dropdownItem: {
    padding: "8px 16px",
  },
  dropdownItemButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "none",
    color: "#ecf0f1",
    cursor: "pointer",
    fontSize: "14px",
    padding: "8px 0",
    transition: "background-color 0.3s",
  },
};

export default LoginNavbar;
