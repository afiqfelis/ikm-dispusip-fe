import React, { useState } from "react";

const DataAdmin = () => {
  // State untuk menyimpan daftar admin yang sudah terdaftar
  const [admins, setAdmins] = useState([
    { id: 1, username: "admin1", email: "admin1@example.com", password: "password1" },
    { id: 2, username: "admin2", email: "admin2@example.com", password: "password2" },
  ]);

  // State untuk input formulir pendaftaran admin baru
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Handler untuk mengubah nilai input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler untuk submit formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      alert("Semua kolom wajib diisi.");
      return;
    }

    // Tambahkan admin baru ke dalam daftar
    const newAdmin = {
      id: Date.now(), // ID unik berdasarkan timestamp
      username: formData.username,
      email: formData.email,
      password: formData.password, // Simpan password
    };
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);

    // Reset formulir
    setFormData({
      username: "",
      password: "",
      email: "",
    });

    alert("Admin berhasil ditambahkan!");
  };

  // Handler untuk menghapus admin
  const handleDelete = (id) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
    alert("Admin berhasil dihapus!");
  };

  return (
    <div style={styles.container}>
      {/* Box Formulir */}
      <div style={styles.formCard}>
        <h2 style={styles.title}>Tambah Admin Baru</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Input Username */}
          <div style={styles.horizontalFormGroup}>
            <label style={styles.horizontalLabel}>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required style={styles.horizontalInput} />
          </div>
          {/* Input Password */}
          <div style={styles.horizontalFormGroup}>
            <label style={styles.horizontalLabel}>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={styles.horizontalInput} />
          </div>
          {/* Input Email */}
          <div style={styles.horizontalFormGroup}>
            <label style={styles.horizontalLabel}>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.horizontalInput} />
          </div>
          {/* Tombol Submit */}
          <button type="submit" style={styles.submitButton}>
            Tambah Admin
          </button>
        </form>
      </div>

      {/* Box Tabel */}
      <div style={styles.tableCard}>
        <h3 style={styles.tableTitle}>Daftar Admin Terdaftar</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No.</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Password</th> {/* Kolom baru */}
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={admin.id}>
                  <td style={styles.td}>{index + 1}</td> {/* Nomor urut */}
                  <td style={styles.td}>{admin.username}</td> {/* Username */}
                  <td style={styles.td}>{admin.email}</td> {/* Email */}
                  <td style={styles.td}>{admin.password}</td> {/* Password */}
                  <td style={styles.td}>
                    {/* Tombol Aksi */}
                    <button style={styles.actionButtonDelete} onClick={() => handleDelete(admin.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  Tidak ada data admin terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Susun box secara vertikal
    alignItems: "center", // Ratakan konten ke tengah
    height: "calc(100vh - 60px)", // Kurangi tinggi untuk memberi ruang bagi Navbar
    backgroundColor: "#f0f2f5",
    padding: "80px 80px", // Padding kiri dan kanan
  },
  formCard: {
    width: "900px", // Lebar box formulir
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px", // Jarak antara box formulir dan tabel
  },
  tableCard: {
    width: "900px", // Lebar box tabel
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center", // Judul rata tengah
    color: "#333",
    fontSize: "18px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  horizontalFormGroup: {
    display: "flex",
    alignItems: "center", // Posisi label dan input sejajar secara vertikal
    marginBottom: "15px",
  },
  horizontalLabel: {
    width: "120px", // Lebar tetap untuk label
    fontWeight: "bold",
    color: "#555",
    fontSize: "14px",
    textAlign: "right", // Ratakan teks label ke kanan
    marginRight: "10px",
  },
  horizontalInput: {
    flex: 1, // Input mengambil sisa ruang yang tersedia
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px",
    width: "20%",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  tableTitle: {
    textAlign: "center", // Judul tabel rata tengah
    color: "#333",
    fontSize: "18px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    padding: "10px",
    fontSize: "14px",
  },
  actionButtonDelete: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default DataAdmin;
