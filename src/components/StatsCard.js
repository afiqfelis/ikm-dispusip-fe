import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardValue}>{value}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    width: "30%",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "16px",
    color: "#777",
    margin: "0 0 10px 0",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0",
  },
};

export default StatsCard;
