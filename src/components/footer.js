import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Hak Cipta */}
      <div style={styles.copyright}>
        <p style={styles.copyrightText}>© 2025 DISPUSIP. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Styling untuk Footer
const styles = {
  footer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    color: "#17202a",
    padding: "20px 40px",
    borderTop: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  copyright: {
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
    textAlign: "center",
  },
  copyrightText: {
    margin: 0,
    fontSize: "14px",
    color: "#555",
  },
};

export default Footer;
