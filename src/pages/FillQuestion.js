import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion"; // Import dari framer-motion
import MenuComponent from "../components/MenuComponent";

const FillQuestion = () => {
  const [activeMenu, setActiveMenu] = useState("isi-kuisoner"); // State untuk melacak menu aktif
  const navigate = useNavigate(); // Hook untuk navigasi

  // State untuk menyimpan nilai dropdown
  const [formData, setFormData] = useState({
    id_unit: "",
    id_usia: "",
    id_jenis_kelamin: "",
    id_pendidikan: "",
    id_pekerjaan: "",
  });

  // State untuk menyimpan data dari backend
  const [backendData, setBackendData] = useState({
    unit: [],
    usia: [],
    jenisKelamin: [],
    pendidikan: [],
    pekerjaan: [],
  });

  // Fungsi untuk memuat data dari backend
  const fetchData = async () => {
    try {
      const response = await fetch("https://ikmb.perpustakaanterbaik.com/api/kuesioner");
      if (!response.ok) {
        throw new Error("Gagal memuat data dari backend.");
      }
      const data = await response.json();
      setBackendData(data); // Simpan data ke state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Jalankan fetchData saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk menangani perubahan nilai dropdown
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    console.log("Data yang dikirim:", formData); // Debugging: Menampilkan data ke konsol

    try {
      // Kirim data ke backend
      const response = await fetch("https://ikmb.perpustakaanterbaik.com/api/kuesioner/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data ke backend.");
      }

      alert("Data berhasil disubmit!");
      navigate("/answer"); // Arahkan pengguna ke halaman AnswerQuestion
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  // Memeriksa apakah semua field telah diisi
  const isFormComplete = Object.values(formData).every((value) => value !== "");

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
      <h1 style={styles.title}>Halaman Isi Kuisoner</h1>

      {/* Menu */}
      <MenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten */}
      <motion.div
        style={styles.content}
        variants={containerVariants} // Variants untuk animasi
        initial="hidden" // Keadaan awal
        animate="visible" // Keadaan akhir (setelah animasi)
      >
        <h2>Isi Kuisoner</h2>
        <p>Silakan isi kuisoner untuk memberikan feedback.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Dropdown Unit Pelayanan */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Unit Pelayanan:</label>
            <select name="id_unit" value={formData.id_unit} onChange={handleChange} style={styles.select}>
              <option value="">-- Pilih Unit Pelayanan --</option>
              {backendData.unit.map((unit) => (
                <option key={unit.id_unit} value={unit.id_unit}>
                  {unit.nama_unit}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Usia */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Usia:</label>
            <select name="id_usia" value={formData.id_usia} onChange={handleChange} style={styles.select}>
              <option value="">-- Pilih Usia --</option>
              {backendData.usia.map((age) => (
                <option key={age.id_usia} value={age.id_usia}>
                  {age.rentang}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Jenis Kelamin */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Jenis Kelamin:</label>
            <select name="id_jenis_kelamin" value={formData.id_jenis_kelamin} onChange={handleChange} style={styles.select}>
              <option value="">-- Pilih Jenis Kelamin --</option>
              {backendData.jenisKelamin.map((gender) => (
                <option key={gender.id_jenis_kelamin} value={gender.id_jenis_kelamin}>
                  {gender.jenis_kelamin}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Pendidikan Terakhir */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Pendidikan Terakhir:</label>
            <select name="id_pendidikan" value={formData.id_pendidikan} onChange={handleChange} style={styles.select}>
              <option value="">-- Pilih Pendidikan Terakhir --</option>
              {backendData.pendidikan.map((edu) => (
                <option key={edu.id_pendidikan} value={edu.id_pendidikan}>
                  {edu.pendidikan}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Pekerjaan */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Pekerjaan:</label>
            <select name="id_pekerjaan" value={formData.id_pekerjaan} onChange={handleChange} style={styles.select}>
              <option value="">-- Pilih Pekerjaan --</option>
              {backendData.pekerjaan.map((job) => (
                <option key={job.id_pekerjaan} value={job.id_pekerjaan}>
                  {job.pekerjaan}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            style={{
              ...styles.submitButton,
              backgroundColor: isFormComplete ? "#007bff" : "#ccc",
              cursor: isFormComplete ? "pointer" : "not-allowed",
            }}
            disabled={!isFormComplete} // Tombol hanya aktif jika semua field terisi
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Styling untuk Halaman FillQuestion
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default FillQuestion;
