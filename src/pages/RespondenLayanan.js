import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const RespondenLayanan = () => {
  // State untuk menyimpan layanan yang dipilih
  const [selectedService, setSelectedService] = useState("");
  // State untuk menyimpan triwulan yang dipilih
  const [selectedTriwulan, setSelectedTriwulan] = useState("");

  // Handler untuk mengubah layanan yang dipilih
  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setSelectedTriwulan(""); // Reset triwulan saat layanan berubah
  };

  // Handler untuk mengubah triwulan yang dipilih
  const handleTriwulanChange = (e) => {
    setSelectedTriwulan(e.target.value);
  };

  // Data sampel untuk tabel 1
  const sampleData = [
    { id: 1, answers: [4, 4, 4, 4, 4, 4, 4, 4, 4], total: 36 },
    { id: 2, answers: [3, 4, 4, 4, 4, 4, 4, 4, 4], total: 35 },
    { id: 3, answers: [4, 4, 4, 4, 3, 4, 4, 4, 4], total: 35 },
  ];

  // Data sampel untuk tabel 2
  const sampleUnsurData = [
    {
      no: 1,
      unsur: "Unsur A",
      jumlahPertanyaan: 9,
      totalNilai: 106,
      nilaiRataRataUnsur: 11.78,
      nilaiRataRata: 35.34,
      nilaiTertimbangUnsur: 3.93,
    },
  ];

  // Data sampel untuk chart bar
  const chartData = {
    labels: ["Responden A", "Responden B", "Responden C"],
    datasets: [
      {
        label: "Total Nilai Responden",
        data: [40, 38, 36],
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <h2 style={styles.title}>Data Responden Per Unit Layanan</h2>

      {/* Dropdown Wrapper */}
      <div style={styles.dropdownWrapper}>
        {/* Dropdown untuk memilih layanan */}
        <div style={styles.dropdownContainer}>
          <label style={styles.label}>Pilih Layanan:</label>
          <select value={selectedService} onChange={handleServiceChange} style={styles.select}>
            <option value="">-- Pilih Layanan --</option>
            <option value="Layanan A">Layanan A</option>
            <option value="Layanan B">Layanan B</option>
          </select>
        </div>

        {/* Dropdown untuk memilih triwulan */}
        {selectedService && (
          <div style={styles.dropdownContainer}>
            <label style={styles.label}>Pilih Triwulan:</label>
            <select value={selectedTriwulan} onChange={handleTriwulanChange} style={styles.select}>
              <option value="">-- Pilih Triwulan --</option>
              <option value="Triwulan 1">Triwulan 1</option>
              <option value="Triwulan 2">Triwulan 2</option>
            </select>
          </div>
        )}
      </div>

      {/* Konten Utama */}
      {selectedService && selectedTriwulan && (
        <>
          {/* Tabel 1 */}
          <div style={styles.tableSection}>
            <h3 style={styles.tableTitle}>Tabel 1: Data Responden</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No. Responden</th>
                  <th style={styles.th}>Pertanyaan 1</th>
                  <th style={styles.th}>Pertanyaan 2</th>
                  <th style={styles.th}>Pertanyaan 3</th>
                  <th style={styles.th}>Pertanyaan 4</th>
                  <th style={styles.th}>Pertanyaan 5</th>
                  <th style={styles.th}>Pertanyaan 6</th>
                  <th style={styles.th}>Pertanyaan 7</th>
                  <th style={styles.th}>Pertanyaan 8</th>
                  <th style={styles.th}>Pertanyaan 9</th>
                  <th style={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.length > 0 ? (
                  sampleData.map((respondent) => (
                    <tr key={respondent.id}>
                      <td style={styles.td}>{respondent.id}</td>
                      {respondent.answers.map((answer, index) => (
                        <td key={index} style={styles.td}>
                          {answer}
                        </td>
                      ))}
                      <td style={styles.td}>{respondent.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" style={styles.noData}>
                      Tidak ada data responden untuk triwulan ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Tabel 2 */}
          <div style={styles.tableSection}>
            <h3 style={styles.tableTitle}>Tabel 2: Data Unsur</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No</th>
                  <th style={styles.th}>Unsur</th>
                  <th style={styles.th}>Jumlah Pertanyaan</th>
                  <th style={styles.th}>Total Nilai</th>
                  <th style={styles.th}>Nilai Rata-Rata Unsur</th>
                  <th style={styles.th}>Nilai Rata-Rata</th>
                  <th style={styles.th}>Nilai Tertimbang Unsur</th>
                </tr>
              </thead>
              <tbody>
                {sampleUnsurData.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.no}</td>
                    <td style={styles.td}>{item.unsur}</td>
                    <td style={styles.td}>{item.jumlahPertanyaan}</td>
                    <td style={styles.td}>{item.totalNilai}</td>
                    <td style={styles.td}>{item.nilaiRataRataUnsur.toFixed(2)}</td>
                    <td style={styles.td}>{item.nilaiRataRata.toFixed(2)}</td>
                    <td style={styles.td}>{item.nilaiTertimbangUnsur.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart Bar */}
          <div style={styles.chartSection}>
            <h3 style={styles.chartTitle}>Grafik Batang</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "left",
    padding: "50px",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  dropdownWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "16px",
    color: "#555",
  },
  select: {
    padding: "8px",
    width: "350px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
  },
  tableSection: {
    width: "100%",
    marginBottom: "30px",
    overflow: "auto",
  },
  tableTitle: {
    textAlign: "left",
    color: "#007bff",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
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
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    padding: "10px",
  },
  chartSection: {
    width: "100%",
    height: "400px",
    overflow: "hidden",
    marginBottom: "30px",
  },
  chartTitle: {
    textAlign: "left",
    color: "#007bff",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

// Konfigurasi Chart.js
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
      },
    },
  },
};

export default RespondenLayanan;
