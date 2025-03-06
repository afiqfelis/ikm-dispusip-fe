import React from "react";
import StatsCard from "../components/StatsCard";
import SurveyList from "../components/SurveyList";
import ChartBar from "../components/chartbar"; // Impor ChartBar
import PieChart from "../components/piechart"; // Impor PieChart

const Dashboard = () => {
  return (
    <div style={styles.mainContent}>
      <h1 style={styles.title}>Dashboard Admin</h1>
      {/* Statistik */}
      <div style={styles.statsContainer}>
        <StatsCard title="Total Responden" value={150} />
        <StatsCard title="Rata-rata Kepuasan" value={4.2} />
        <StatsCard title="Survei Selesai" value={50} />
      </div>
      {/* Daftar Survei */}
      <div style={styles.surveySection}>
        <h2 style={styles.subtitle}>Daftar Survei</h2>
        <SurveyList />
      </div>
      {/* ChartBar dan PieChart Bersebelahan */}
      <div style={styles.chartsContainer}>
        <div style={styles.chartWrapper}>
          <h2 style={styles.subtitle}>Grafik Hasil Survei (Bar)</h2>
          <ChartBar />
        </div>
        <div style={styles.chartWrapper}>
          <h2 style={styles.subtitle}>Grafik Hasil Survei (Pie)</h2>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

// Objek styling
const styles = {
  mainContent: {
    marginTop: "70px", // Memberi ruang untuk navbar
    marginLeft: "20px", // Margin kiri agar lebih rapat
    padding: "20px",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "40px",
  },
  surveySection: {
    marginTop: "20px",
  },
  chartsContainer: {
    display: "flex", // Menggunakan flexbox untuk menyusun chart bersebelahan
    justifyContent: "space-between", // Memberi jarak antara chart
    marginTop: "40px",
  },
  chartWrapper: {
    flex: 1, // Membagi ruang secara merata
    margin: "0 10px", // Memberi jarak antar chart
  },
  subtitle: {
    color: "#555",
    marginBottom: "10px",
  },
};

export default Dashboard;
