import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const Sidebar = () => {
  // State untuk menyimpan status dropdown (terbuka atau tertutup)
  const [dropdownIndex, setDropdownIndex] = useState(null); // Menyimpan indeks dropdown yang aktif
  // Mendapatkan lokasi saat ini
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>DISPUSIP</h2>
      <ul style={styles.menu}>
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/add-service-unit", label: "Tambah Unit Layanan" },
          { to: "/add-question", label: "Tambah Pertanyaan Survey" },
          { to: "/data-layanan", label: "Data Layanan" },
          { to: "/responden-layanan", label: "Data Responden Per Unit Layanan" },
          {
            label: "Data Survey",
            dropdown: [
              { to: "/data-rekapitulasi-survey", label: "Data Rekapitulasi Survey" },
              { to: "/data-grafik-survey", label: "Data Grafik Survey" },
              { to: "/data-responden-survey", label: "Data Responden Survey" },
            ],
          },
        ].map((item, index) => {
          // Cek apakah menu ini aktif
          const isActive = item.to && location.pathname === item.to;

          // Render menu biasa jika tidak ada dropdown
          if (!item.dropdown) {
            return (
              <li
                key={index}
                style={{
                  ...styles.menuItem,
                  ...(isActive && styles.activeEffect), // Efek aktif
                }}
              >
                <Link to={item.to} style={isActive ? styles.activeLink : styles.link}>
                  {item.label}
                </Link>
              </li>
            );
          }

          // Render menu dropdown jika ada dropdown
          const isDropdownActive = dropdownIndex === index; // Cek apakah dropdown ini aktif

          return (
            <li
              key={index}
              style={{
                ...styles.menuItem,
              }}
            >
              {/* Label dropdown dengan panah */}
              <div
                style={styles.dropdownLabel}
                onClick={() => setDropdownIndex(isDropdownActive ? null : index)} // Toggle dropdown
              >
                {item.label}
                <span style={styles.dropdownArrow}>{isDropdownActive ? "▲" : "▼"}</span>
              </div>

              {/* Submenu dropdown */}
              {isDropdownActive && (
                <ul style={styles.dropdownMenu}>
                  {item.dropdown.map((subItem, subIndex) => {
                    const isSubActive = location.pathname === subItem.to;
                    return (
                      <li
                        key={subIndex}
                        style={{
                          ...styles.dropdownMenuItem,
                          ...(isSubActive && styles.activeEffect), // Efek aktif untuk submenu
                        }}
                      >
                        <Link to={subItem.to} style={isSubActive ? styles.activeLink : styles.link}>
                          {subItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Styling untuk Sidebar
const styles = {
  sidebar: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "250px",
    height: "100vh",
    backgroundColor: "#fff",
    color: "#2c3e50",
    padding: "25px",
    boxSizing: "border-box",
    zIndex: 1000,
    borderRight: "2px solid #ddd",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "50px",
    textAlign: "center",
  },
  menu: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  menuItem: {
    marginBottom: "20px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  link: {
    textDecoration: "none",
    color: "#2c3e50",
    fontWeight: "bold",
    display: "block",
    padding: "10px 15px",
    borderRadius: "10px",
  },
  activeLink: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    display: "block",
    padding: "10px 15px",
    borderRadius: "10px",
  },
  activeEffect: {
    backgroundColor: "#0056b3",
    borderRadius: "20px",
    color: "#fff",
  },
  dropdownLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  dropdownArrow: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  dropdownMenu: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    marginTop: "5px",
    marginLeft: "20px",
  },
  dropdownMenuItem: {
    marginBottom: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
};

export default Sidebar;
