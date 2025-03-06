import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Impor Axios
import Navbar from "../components/loginNavbar"; // Impor NavbarLogin

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk handle login
  const handleLogin = async () => {
    try {
      // Kirim permintaan POST ke API login
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email, // Ganti 'username' menjadi 'email' sesuai API
        password: password,
      });

      // Dapatkan token dari respons API
      const { access_token, token_type } = response.data;

      // Simpan token di localStorage atau state global (misalnya Redux)
      localStorage.setItem("token", `${token_type} ${access_token}`);

      // Panggil fungsi onLogin dari props
      onLogin();

      // Arahkan pengguna ke halaman dashboard
      navigate("/dashboard");
    } catch (error) {
      // Tangani error jika login gagal
      if (error.response && error.response.status === 401) {
        alert("Username atau password salah!");
      } else {
        alert("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
    }
  };

  // Fungsi untuk mendeteksi tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Panggil fungsi login jika tombol Enter ditekan
    }
  };

  return (
    <div style={styles.page}>
      {/* NavbarLogin */}
      <Navbar />
      {/* Konten Utama */}
      <div style={styles.content}>
        {/* Kotak Pembungkus */}
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Login</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label> {/* Ubah label dari "Username" ke "Email" */}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress} // Deteksi tombol Enter
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress} // Deteksi tombol Enter
              style={styles.input}
            />
          </div>
          {/* Container untuk Tombol */}
          <div style={styles.buttonContainer}>
            <button onClick={handleLogin} style={styles.button}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styling untuk halaman Login
const styles = {
  page: {
    minHeight: "90vh", // Tinggi minimal halaman adalah 100% dari viewport
    minWidth: "80vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f2f5", // Warna latar belakang halaman
    overflow: "hidden", // Hilangkan scrolling jika tidak diperlukan
    margin: 0, // Hapus margin default
    padding: 0, // Hapus padding default
  },
  content: {
    flexGrow: 1, // Pastikan konten utama mengisi ruang tersisa
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "80px", // Ruang untuk NavbarLogin
    boxSizing: "border-box", // Pastikan padding termasuk dalam lebar total
  },
  loginBox: {
    width: "100%", // Lebar kotak disesuaikan dengan layar
    maxWidth: "400px", // Batasi lebar maksimal kotak
    padding: "40px", // Padding untuk ruang kosong
    backgroundColor: "#fff", // Warna latar belakang kotak
    borderRadius: "10px", // Sudut melengkung
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Efek bayangan
    boxSizing: "border-box", // Pastikan padding termasuk dalam lebar total
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center", // Teks judul di tengah
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    display: "block", // Pastikan label berada di baris baru
  },
  input: {
    width: "100%", // Input memenuhi lebar kotak
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxSizing: "border-box", // Pastikan padding termasuk dalam lebar total
  },
  buttonContainer: {
    display: "flex", // Aktifkan Flexbox
    justifyContent: "center", // Pusatkan secara horizontal
    alignItems: "center", // Pusatkan secara vertikal
    marginTop: "20px", // Ruang antara input dan tombol
  },
  button: {
    width: "100%", // Tombol memenuhi lebar kotak
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px", // Ukuran teks tombol
    boxSizing: "border-box", // Pastikan padding termasuk dalam lebar total
  },
};

export default Login;
