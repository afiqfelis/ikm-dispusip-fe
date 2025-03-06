import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout, isLogin }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dropdown
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Fungsi untuk handle logout
  const handleLogout = () => {
    onLogout(); // Panggil fungsi logout dari props
    navigate("/login"); // Arahkan ke halaman login
  };

  // Event listener untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownContainer = document.querySelector(".dropdown-container");
      if (dropdownContainer && !dropdownContainer.contains(event.target)) {
        setIsOpen(false); // Tutup dropdown jika klik di luar
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
    <nav style={isLogin ? styles.loginNavbar : styles.navbar}>
      {/* Judul Navbar */}
      <h2 style={styles.title}>DISPUSIP</h2>

      {/* Dropdown Menu (Hanya ditampilkan jika bukan halaman login) */}
      {!isLogin && (
        <div className="dropdown-container" style={styles.dropdownContainer}>
          <button style={styles.dropdownButton} onClick={toggleDropdown}>
            Menu
            <span style={styles.arrowIcon}>{isOpen ? "▲" : "▼"}</span>
          </button>

          {/* Dropdown Items */}
          {isOpen && (
            <ul style={styles.dropdownMenu}>
              {/* Item Data Admin */}
              <li style={styles.dropdownItem}>
                <button style={styles.dropdownItemButton} onClick={() => navigate("/data-admin")}>
                  Data Admin
                </button>
              </li>
              {/* Item Logout */}
              <li style={styles.dropdownItem}>
                <button style={styles.dropdownItemButton} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

// Styling untuk Navbar
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between", // Pindahkan konten ke ujung kanan
    alignItems: "center",
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "1px 20px", // Tambahkan padding kecil untuk ruang kosong
    position: "fixed",
    top: 0,
    left: "250px", // Sesuaikan dengan lebar Sidebar
    width: "calc(100% - 250px)", // Sisakan ruang untuk Sidebar
    zIndex: 1000,
    margin: 0,
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "relative",
    left: "-20px", // Geser elemen 20px ke kanan
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    border: "none",
    color: "#ecf0f1",
    cursor: "pointer",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  arrowIcon: {
    marginLeft: "8px",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%", // Letakkan dropdown tepat di bawah tombol
    right: "15px", // Geser dropdown menu 10px ke kanan
    marginTop: "8px",
    backgroundColor: "#34495e",
    color: "#fff",
    listStyle: "none",
    padding: "8px 0",
    margin: 0,
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minWidth: "150px",
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

export default Navbar;
