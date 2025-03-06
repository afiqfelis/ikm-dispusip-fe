import React from "react";

const DataRekapSurvey = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Data Rekapitulasi Survey</h2>
      <div style={styles.content}>
        {/* Placeholder untuk konten */}
        <p style={styles.placeholder}>Halaman ini masih kosong. Silakan tambahkan konten atau data rekapitulasi survey di sini.</p>
      </div>
    </div>
  );
};

// Styling untuk halaman
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    maxWidth: "1200px",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  placeholder: {
    textAlign: "center",
    color: "#888",
    fontSize: "16px",
  },
};

export default DataRekapSurvey;
