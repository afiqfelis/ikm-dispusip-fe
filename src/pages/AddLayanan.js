import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddServiceUnit = () => {
  const [formData, setFormData] = useState({
    nama_unit: "",
    password: "", // Sesuaikan dengan backend
  });
  const [error, setError] = useState("");
  const [serviceUnits, setServiceUnits] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Ambil data unit dari backend
  useEffect(() => {
    fetch("https://ikm.perpustakaanterbaik.com/api/unit", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data unit");
        return res.json();
      })
      .then((data) => setServiceUnits(data))
      .catch((error) => {
        console.error("Error fetching units:", error);
        setError("Gagal memuat data unit. Cek koneksi atau token.");
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/unit/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // Kirim password ke backend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan unit");
      }

      const newUnit = await response.json();
      setServiceUnits([...serviceUnits, newUnit]);
      setFormData({ nama_unit: "", password: "" });
      alert("Unit layanan berhasil ditambahkan!");
      navigate("/add-service-unit");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id_unit) => {
    try {
      const response = await fetch(`http://localhost:8000/api/unit/delete/${id_unit}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: formData.password }), // Kirim password untuk validasi
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus unit");
      }

      setServiceUnits(serviceUnits.filter((unit) => unit.id_unit !== id_unit));
      alert("Unit layanan berhasil dihapus!");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Tambah Unit Layanan</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.horizontalFormGroup}>
            <label style={styles.horizontalLabel}>Nama Layanan:</label>
            <input type="text" name="nama_unit" value={formData.nama_unit} onChange={handleChange} required style={styles.horizontalInput} />
          </div>
          <div style={styles.horizontalFormGroup}>
            <label style={styles.horizontalLabel}>Password Admin:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={styles.horizontalInput} />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              Tambahkan
            </button>
          </div>
        </form>
      </div>

      <div style={styles.tableCard}>
        <h3 style={styles.tableTitle}>Daftar Unit Layanan</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No.</th>
              <th style={styles.th}>Nama Unit Layanan</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {serviceUnits.map((unit, index) => (
              <tr key={unit.id_unit}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{unit.nama_unit}</td>
                <td style={styles.td}>
                  <button style={styles.actionButtonDelete} onClick={() => handleDelete(unit.id_unit)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "calc(100vh - 60px)",
    backgroundColor: "#f0f2f5",
    padding: "90px 120px",
  },
  formCard: {
    width: "900px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    position: "relative",
  },
  tableCard: {
    width: "900px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
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
    alignItems: "center",
    marginBottom: "15px",
  },
  horizontalLabel: {
    width: "120px",
    fontWeight: "bold",
    color: "#555",
    fontSize: "14",
    textAlign: "right", // Ratakan teks label ke kanan
    marginRight: "10px", // Jarak antara label dan input
  },
  horizontalInput: {
    flex: 1, // Input mengambil sisa ruang yang tersedia
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end", // Posisikan tombol di kanan
    alignItems: "flex-end", // Posisikan tombol di bawah
    marginTop: "10px", // Jarak dari elemen sebelumnya
  },
  submitButton: {
    padding: "10px", // Padding tombol dikurangi
    width: "120px", // Ubah lebar tombol menjadi otomatis
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px", // Ukuran font tombol dikurangi
  },
  error: {
    color: "#e74c3c",
    textAlign: "left", // Pesan kesalahan rata kiri
    marginBottom: "10px",
    fontSize: "14px", // Ukuran font pesan kesalahan dikurangi
  },
  tableTitle: {
    textAlign: "center", // Judul tabel rata kiri
    color: "#333",
    fontSize: "18px", // Ukuran font judul tabel dikurangi
    marginBottom: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px", // Padding header tabel dikurangi
    textAlign: "left",
    fontSize: "14px", // Ukuran font header tabel dikurangi
  },
  td: {
    padding: "8px", // Padding sel tabel dikurangi
    border: "1px solid #ddd",
    fontSize: "14px", // Ukuran font isi tabel dikurangi
  },
  noData: {
    textAlign: "center",
    color: "#999",
    padding: "10px",
    fontSize: "14px", // Ukuran font pesan "tidak ada data" dikurangi
  },
  actionButtonEdit: {
    padding: "5px 8px", // Padding tombol edit dikurangi
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
    fontSize: "12px", // Ukuran font tombol edit dikurangi
  },
  actionButtonDelete: {
    padding: "5px 8px", // Padding tombol hapus dikurangi
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px", // Ukuran font tombol hapus dikurangi
  },
};

export default AddServiceUnit;
