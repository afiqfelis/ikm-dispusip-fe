import React from "react";

const SurveyList = () => {
  // Data dummy untuk daftar survei
  const surveys = [
    { id: 1, name: "Survei Kepuasan Layanan A", date: "2023-10-01" },
    { id: 2, name: "Survei Kepuasan Layanan B", date: "2023-10-05" },
    { id: 3, name: "Survei Kepuasan Layanan C", date: "2023-10-10" },
  ];

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Nama Survei</th>
          <th style={styles.th}>Tanggal</th>
        </tr>
      </thead>
      <tbody>
        {surveys.map((survey) => (
          <tr key={survey.id} style={styles.tr}>
            <td style={styles.td}>{survey.id}</td>
            <td style={styles.td}>{survey.name}</td>
            <td style={styles.td}>{survey.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default SurveyList;
