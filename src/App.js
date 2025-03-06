import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar"; // Impor Sidebar
import LoginNavbar from "./components/loginNavbar"; // Impor LoginNavbar
import Navbar from "./components/navbar"; // Impor AdminNavbar
import Dashboard from "./pages/dashboard";
import DataAdmin from "./pages/DataAdmin";
import AddQuestion from "./pages/AddQuestion";
import Login from "./pages/login";
import DataLayanan from "./pages/DataLayanan";
import AddServiceUnit from "./pages/AddLayanan"; // Impor halaman AddServiceUnit
import RespondenLayanan from "./pages/RespondenLayanan";
import DataRekapSurvey from "./pages/DataRekapSurvey";
import DataGrafikSurvey from "./pages/DataGrafikSurvey";
import DataResponSurvey from "./pages/DataResponSurvey";
import HomeProfile from "./pages/HomeProfile"; // Impor HomeProfile
import FillQuestion from "./pages/FillQuestion";
import AnswerQuestion from "./pages/AnswerQuestion";
import Profile from "./pages/Profile";
import Footer from "./components/footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // State untuk login

  // Fungsi untuk handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Fungsi untuk handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Tampilkan Navbar sesuai kondisi */}
        {isLoggedIn ? <Navbar onLogout={handleLogout} /> : <LoginNavbar />}

        {/* Tampilkan Sidebar jika sudah login */}
        {isLoggedIn && <Sidebar />}

        {/* Konten Utama */}
        <div
          style={{
            marginLeft: isLoggedIn ? "250px" : "0", // Sisakan ruang untuk Sidebar jika login
            width: isLoggedIn ? "calc(100% - 250px)" : "100%", // Sesuaikan lebar konten utama
            transition: "margin-left 0.3s", // Animasi halus
            flexGrow: 1, // Pastikan konten utama mengisi ruang tersisa
            padding: "20px", // Tambahkan padding untuk ruang kosong
          }}
        >
          <Routes>
            {/* Halaman Login */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Halaman Dashboard (Hanya untuk Pengguna yang Sudah Login) */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />

            {/* Halaman Data Admin */}
            <Route path="/data-admin" element={<DataAdmin />} />

            {/* Halaman Add Question (Hanya untuk Pengguna yang Sudah Login) */}
            <Route path="/add-question" element={isLoggedIn ? <AddQuestion /> : <Navigate to="/login" />} />

            {/* Halaman Data Layanan (Hanya untuk Pengguna yang Sudah Login) */}
            <Route path="/data-layanan" element={isLoggedIn ? <DataLayanan /> : <Navigate to="/login" />} />

            {/* Halaman Add Service Unit (Hanya untuk Pengguna yang Sudah Login) */}
            <Route path="/add-service-unit" element={isLoggedIn ? <AddServiceUnit /> : <Navigate to="/login" />} />

            {/* Halaman Responden Layanan */}
            <Route path="/responden-layanan" element={<RespondenLayanan />} />

            {/* Halaman Data Rekapitulasi Survey */}
            <Route path="/data-rekapitulasi-survey" element={<DataRekapSurvey />} />

            {/* Halaman Data Grafik Survey */}
            <Route path="/data-Grafik-survey" element={<DataGrafikSurvey />} />

            {/* Halaman Data Respon Survey */}
            <Route path="/data-Responden-survey" element={<DataResponSurvey />} />

            {/* Routing untuk halaman HomeProfile */}
            <Route path="/home-profile" element={<HomeProfile />} />

            {/* Routing untuk halaman Isi Kuisoner */}
            <Route path="/isi-kuisoner" element={<FillQuestion />} />

            <Route path="/" element={<FillQuestion />} />
            <Route path="/answer" element={<AnswerQuestion />} />

            {/* Routing untuk halaman Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Default route (opsional) */}
            <Route path="/" element={<HomeProfile />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
