import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2025 DISPUSIP. All rights reserved.</p>
    </footer>
  );
};

// Styling untuk Footer
const styles = {
  footer: {
    backgroundColor: "#fff",
    color: "#17202a",
    padding: "15px 20px",
    textAlign: "center",
    width: "100%", // Footer menempati lebar penuh
    borderTop: "1px solid #ccc", // Garis tipis di bagian atas Footer
  },
  text: {
    margin: 0,
    fontSize: "14px",
  },
};

export default Footer;
